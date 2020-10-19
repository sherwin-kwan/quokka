//Check to see if there is an attempt ID in the DB:

const getAttemptData = function(attemptId, db) {
  const queryString = `
    SELECT
      quizzes.title,
      users.fname,
      users.lname,
      ROUND((SUM(CASE WHEN possible_answers.is_correct = true THEN 1 ELSE 0 END)/1.00) / (count(user_answers.*)/1.00)*100) as percent_correct
    FROM attempts
      JOIN quizzes ON attempts.quiz_id = quizzes.id
      JOIN users ON attempts.user_id = users.id
      JOIN user_answers ON attempts.id = user_answers.attempt_id
      JOIN possible_answers ON user_answers.selected_answer = possible_answers.id
    WHERE attempts.id = $1
    GROUP BY quizzes.title, users.fname, users.lname, attempts.finished_at
  `;
  const queryParams = [attemptId];
  return db.query(queryString, queryParams)
    .then(res => res.rows[0])
    .catch(err => console.log(err))
};

const getQuestionData = function(attemptId, db, callback) {
    const queryString = `
    SELECT questions.id, question_num, text
    FROM questions
      JOIN quizzes ON questions.quiz_id = quizzes.id
      JOIN attempts on quizzes.id = attempts.quiz_id
    WHERE attempts.id = $1
    ORDER BY question_num
    `;
    const queryParams = [attemptId];
    return db.query(queryString, queryParams, (err, result) => {
      if (err) {
        return console.error('Error executing query', err.stack);
      }
      callback(result.rows);
    });
};

// const getPossibleAnswers =

module.exports = { getAttemptData, getQuestionData }

