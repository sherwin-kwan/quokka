//Check to see if there is an attempt ID in the DB:

const getAttemptData = function(attemptId, db) {
  const queryString = `
    SELECT
      quizzes.title AS title,
      users.fname AS fname,
      users.lname AS lname,
      ROUND((SUM(CASE WHEN possible_answers.is_correct = true THEN 1 ELSE 0 END)/1.00) / (count(user_answers.*)/1.00)*100) AS percent_correct,
      quizzes.id AS quiz_id
    FROM attempts
      JOIN quizzes ON attempts.quiz_id = quizzes.id
      JOIN users ON attempts.user_id = users.id
      JOIN user_answers ON attempts.id = user_answers.attempt_id
      JOIN possible_answers ON user_answers.selected_answer = possible_answers.id
    WHERE attempts.id = $1
    GROUP BY quizzes.title, quizzes.id, users.fname, users.lname, attempts.finished_at
  `;
  const queryParams = [attemptId];
  return db.query(queryString, queryParams)
    .then(res => res.rows[0])
    .catch(err => console.error('query error', err.stack));
};


//Load a JSON of the full quiz given quiz_id:

const loadWholeQuizJson = (quiz_id, db) => {
  const queryString = `
  SELECT questions.question_num, questions.text,
    (SELECT json_agg(filtered_answers) FROM
      (SELECT id, answer_text
        FROM possible_answers
        WHERE question_id = questions.id
      ) filtered_answers
    )
  AS answer_options
  FROM questions
  WHERE questions.quiz_id = $1
  `
  const queryParams = [quiz_id];
  return db.query(queryString, queryParams)
  .then(res => res.rows)
  .catch(err => console.error('query error', err.stack));
};

module.exports = { getAttemptData, loadWholeQuizJson }


// const getQuestionData = function(attemptId, db, callback) {
//       const queryString = `
//       SELECT questions.id, question_num, text
//       FROM questions
//         JOIN quizzes ON questions.quiz_id = quizzes.id
//         JOIN attempts on quizzes.id = attempts.quiz_id
//       WHERE attempts.id = $1
//       ORDER BY question_num
//       `;
//       const queryParams = [attemptId];
//       return db.query(queryString, queryParams)
//       .then(res => res.rows)
//       .catch(err => console.log(err))
//   };
