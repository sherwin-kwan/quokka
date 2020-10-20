
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

// console.log(loadOneQuestionJson('6'));
// console.log(loadWholeQuizJson('2'));

const saveQuizAttempt = (userId, quizId, submission, db) => {
  return db.query(`
    INSERT INTO attempts (user_id, quiz_id, finished_at)
      VALUES(${userId}, ${quizId}, NOW())
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

module.exports = { loadOneQuestionJson, loadWholeQuizJson, saveQuizAttempt };
