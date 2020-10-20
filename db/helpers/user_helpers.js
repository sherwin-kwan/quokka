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

};

//Given a user ID, select the high score & quiz title for each quiz the user has taken:
const getQuizzesTaken = function(userId, db) {

};

module.exports = { getUserName, getQuizzesCreated, getQuizzesTaken };
