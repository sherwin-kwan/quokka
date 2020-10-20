const inspect = require('util').inspect;
const format = require('pg-format');

/* This function returns a Javascript object representing one question on a quiz, in the format
 {question_num: 1,
questions.text: 'What is the capital of Canada?',
answer_options: [
  {id: 1, answer_text: 'Toronto'},
  {id: 2, answer_text: 'Ottawa'},
  {id: 3, answer_text: 'Vancouver'}
]} */

const loadOneQuestionJson = (questionId, db) => {
  return db.query(`
  SELECT questions.question_num, questions.text,
    (SELECT json_agg(filtered_answers) FROM
      (SELECT id, answer_text
        FROM possible_answers
        WHERE question_id = questions.id
      ) filtered_answers
    )
  AS answer_options
  FROM questions
  WHERE questions.id = ${format(questionId)};
  `)
    .then(res => res.rows)
    .catch(err => console.error('query error', err.stack));
};

/* This function returns an array of Javascript objects representing a whole quiz, each object  of which represents
a single question within that quiz, e.g.:
 [{question_num: 1,
    questions.text: 'What is the capital of Canada?',
    answer_options: [
      {id: 1, answer_text: 'Toronto'},
      {id: 2, answer_text: 'Ottawa'},
      {id: 3, answer_text: 'Vancouver'}
    ]
  },
  {question_num: 2,
    questions.text: 'What is the capital of France?',
    answer_options: [
      {id: 1, answer_text: 'Marseille'},
      {id: 2, answer_text: 'Lille'},
      {id: 3, answer_text: 'Paris'}
    ]
  }] */

const loadWholeQuizJson = (quizId, db) => {
  return db.query(`
  SELECT questions.question_num, questions.text,
    (SELECT json_agg(filtered_answers) FROM
      (SELECT id, answer_text
        FROM possible_answers
        WHERE question_id = questions.id
      ) filtered_answers
    )
  AS answer_options
  FROM questions
  WHERE questions.quiz_id = ${format(quizId)};
  `)
    .then(res => res.rows)
    .catch(err => console.error('query error', err.stack));
};

// Use pg-format on IDs to ensure that no one can make a malicious POST like /quiz/22';DROP TABLE users;-- or something like that.
const saveQuizAttempt = (userId, quizId, submission, db) => {
  return db.query(`
    INSERT INTO attempts (user_id, quiz_id, finished_at)
      VALUES(${format(userId)}, ${format(quizId)}, NOW())
      RETURNING id;`)
    .catch(err => console.error('error creating a new row in attempts', err.stack))
    .then((returnedRow) => {
      const attemptId = returnedRow.rows[0].id;
      let insertAnswersQuery = 'INSERT INTO user_answers (attempt_id, selected_answer) VALUES ';
      for (const value of Object.values(submission)) {
        // For each value 'a20', 'a24' etc., convert it into the ID of the response selected
        let answerId = Number(value.substring(1));
        if (isNaN(answerId)) {
          throw new Error('A non-numeric answer ID was sent to the server, this attempt cannot be registered');
        }
        insertAnswersQuery += `(${attemptId}, ${answerId}),`;
      }
      // Lop off the ending comma to make the query a valid SQL query
      insertAnswersQuery = insertAnswersQuery.substring(0, insertAnswersQuery.length - 1) + ' RETURNING *';
      return db.query(insertAnswersQuery);
    })
    .catch(err => console.error('error saving quiz attempt', err.stack));
};

  // Saves a row for a new quiz in the quizzes table, and returns the newly-created id
  // The strings in the params argument are not sanitized data, so it is sanitized here with pg-format before inserting into database

  // Example of a POST request params and body that would be input to this function:
  // params: { id: 35 }
  /* body: {
  title: 'Northern Lights',
  description: 'Learn about the least-populated parts of North America!',
  is_public: 'on',
  questions: [
    'What is the capital of Yukon?',
    'What is the capital of Northwest Territories?'
  ],
  a1: [ 'correct', 'Whitehorse', 'Darkhorse' ],
  a2: [ 'Greenknife', 'correct', 'Yellowknife' ]
  }
  */
 const saveNewQuiz = (params, body, db) => {
  // Convert from the JSON sent by jQuery (checked checkboxes have the value 'on') into a JS boolean
  const isPublic = (body.is_public === 'on') ? true : false;
  return db.query(`
  INSERT INTO quizzes (creator_id, title, description, created_at, is_public)
  VALUES ('${format(params.creator_id)}', '${format(body.title)}', '${format(body.description)}', NOW(), ${isPublic})
  RETURNING id;`)
  .then((data) => {
    const quizId = data.rows[0].id;
    console.log(`Created quiz ${quizId}`);
    // Begin building a query for the questions table
    let questionsQuery = `
    INSERT INTO questions (quiz_id, question_num, text)
    VALUES `;
    for (let i = 0; i < body.questions.length; i++) {
      // Note: The loop variable starts at 0, but the first question should be saved as number 1; hence i+1
      questionsQuery += `(${quizId}, ${i+1}, '${format(body.questions[i])}'),`;
    }
    // Lop off the ending comma to make the query a valid SQL query, then add RETURNING so we can capture the question ID
    questionsQuery = questionsQuery.substring(0, questionsQuery.length - 1) + ' RETURNING id;';
    // Send quizID through to the next "then", we want to return it at the end of the function so we can notify the creator of the link to the created quiz
    return Promise.all([db.query(questionsQuery), quizId]);
  })
  .then((data) => {
    // The question IDs will be returned in an array of objects such as [ {id: 1}, {id: 2}, {id: 3}]
    // Extract the numbers from these objects to make the array easier to use [1, 2, 3]
    const questionIdArray = data[0].rows.map(obj => obj.id);
    // Now, we delete the first few properties from the body object, until all that is left are the arrays of answers
    const keys_to_delete = ['title','description','is_public','questions'];
    for (const key of keys_to_delete) {
      delete(body[key]);
    }
    const answerOptionsArray = Object.values(body);
    // Now, we should have two arrays, one composed of question IDs, and one composed of arrays of multiple-choice answers for questions
    // If they aren't the same length, something went wrong with this code
    if (answerOptionsArray.length !== questionIdArray.length) {
      throw new Error('Something went wrong, there are more questions than there are sets of answers, or vice versa');
    };
    // Begin building a query for the answers table
    let possibleAnswersQuery = `
    INSERT INTO possible_answers (question_id, answer_text, is_correct)
    VALUES
    `;
    // Each array within answerOptionsArray will have the format [ 'Greenknife', 'correct', 'Yellowknife' ],
    // where "correct" is a flag that signifies that the immediate next option is a correct answer.
    // Create a boolean variable to handle the insertion of correct and incorrect answers
    let isCorrect = false;
    for (let i = 0; i < questionIdArray.length; i++) {
      for (let j = 0; j < answerOptionsArray[i].length; j++) {
        // Determine if the entry at index j is actually an option text, or is the flag 'correct'
        const entry = answerOptionsArray[i][j];
        if (entry === 'correct') {
          isCorrect = true;
          continue;
        }
        possibleAnswersQuery += `(${questionIdArray[i]}, '${format(answerOptionsArray[i][j])}', ${isCorrect}),`;
        // Once a correct answer has been inserted, reset the isCorrect variable
        if (isCorrect) {
          isCorrect = false;
        }
      }
    }
    // Lop off the ending comma to make the query a valid SQL query, then add RETURNING so we can capture the answer IDs
    possibleAnswersQuery = possibleAnswersQuery.substring(0, possibleAnswersQuery.length - 1) + ' RETURNING id;';
    return Promise.all([db.query(possibleAnswersQuery), data[1], questionIdArray]);
  })
  .then((arr) => {
    const optionIdArray = arr[0].rows.map(obj => obj.id);
    return [arr[1], arr[2], optionIdArray]; // quizId, questionIdArray, optionIdArray
  });
  // .catch((err) => {
  //   throw new Error('Database saving error');
  // });
};

module.exports = { loadOneQuestionJson, loadWholeQuizJson, saveQuizAttempt, saveNewQuiz };
