//Check to see if there is an attempt ID in the DB:

const getAttemptData = function(attemptId, db) {
  const queryString = `
    SELECT
      quizzes.title AS title,
      users.fname AS fname,
      users.lname AS lname,
      SUM(CASE WHEN possible_answers.is_correct = true THEN 1 ELSE 0 END) AS num_correct,
      COUNT(user_answers.*) AS num_total,
      ROUND((SUM(CASE WHEN possible_answers.is_correct = true THEN 1 ELSE 0 END)/1.00) / (COUNT(user_answers.*)/1.00)*100) AS percent_correct,
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


//Load a JSON of the full quiz (questions & answer options with is_correct and user_selected) given attempt_id:

const loadWholeQuizJson = (attemptId, db) => {
  const queryString = `
  SELECT questions.question_num, questions.text,
    (SELECT json_agg(filtered_answers) FROM
      (SELECT
        possible_answers.id,
        possible_answers.answer_text,
        possible_answers.is_correct,
        CASE WHEN possible_answers.id IN (
          SELECT selected_answer
          FROM possible_answers
            JOIN user_answers ON possible_answers.id = user_answers.selected_answer
            JOIN attempts ON user_answers.attempt_id = attempts.id
            WHERE attempts.id = $1
        ) THEN 1 ELSE 0 END AS user_selected
        FROM possible_answers
        WHERE possible_answers.question_id = questions.id
      ) filtered_answers
    )
  AS answer_options
  FROM questions
    JOIN quizzes ON questions.quiz_id = quizzes.id
    JOIN attempts ON quizzes.id = attempts.quiz_id
  WHERE attempts.id = $1
  `
  const queryParams = [attemptId];
  return db.query(queryString, queryParams)
  .then(res => res.rows)
  .catch(err => console.error('query error', err.stack));
};

module.exports = { getAttemptData, loadWholeQuizJson }
