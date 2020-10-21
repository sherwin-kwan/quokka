const format = require('pg-format');

//Queries for the latest 10 
const loadPublicQuizzes = (db) => {
  return db.query(`SELECT id, title
  FROM quizzes
  WHERE is_public = true
  ORDER BY created_at DESC
  LIMIT 16;`)
  .then(results => {
    return results.rows;
  })
  .catch(err => {
    console.log("Home page query went horribly wrong", err);
  });
};

module.exports = {loadPublicQuizzes};