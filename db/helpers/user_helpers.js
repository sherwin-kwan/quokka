//Given user ID, select name
const getUserName = function(userId, db) {
  const queryString = `
    SELECT fname, lname
    FROM users
    WHERE id = $1
  `;
  const queryParams = [userId];
  return db.query(queryString, queryParams)
    .then(res => res.rows[0])
    .catch(err => console.error('query error', err.stack));
};

//Given a user ID, select quiz title and isPublic for every quiz the user has created:
const getQuizzesCreated = function(userId, db) {
  const queryString = `
    SELECT title, is_public
    FROM quizzes
    WHERE creator_id = $1
    ORDER BY created_at DESC
  `;
  const queryParams = [userId];
  return db.query(queryString, queryParams)
    .then(res => res.rows)
    .catch(err => console.error('query error', err.stack));
};

//Given a user ID, select the high score & quiz title for each quiz the user has taken:
const getQuizzesTaken = function(userId, db) {
  const queryString = `
    SELECT
      quizzes.title as title,
      ROUND((SUM(CASE WHEN possible_answers.is_correct = true THEN 1 ELSE 0 END)/1.00) / (count(user_answers.*)/1.00)*100) as percent_correct
    FROM quizzes
      JOIN attempts ON quizzes.id = attempts.quiz_id
      JOIN user_answers ON attempts.id = user_answers.attempt_id
      JOIN possible_answers ON user_answers.selected_answer = possible_answers.id
    WHERE attempts.user_id = $1
    GROUP BY quizzes.title, attempts.finished_at
    ORDER BY attempts.finished_at DESC
  `;
  const queryParams = [userId];
  return db.query(queryString, queryParams)
    .then(res => res.rows)
    .catch(err => console.error('query error', err.stack));
};

module.exports = { getUserName, getQuizzesCreated, getQuizzesTaken };