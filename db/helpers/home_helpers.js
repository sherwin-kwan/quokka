// Helper functions for home page

//Queries for the latest <limit> results in <db>, sorted by <sort>
const loadPublicQuizzes = (sort, limit, db) => {
  let query;
  switch (sort) {
    case 'recent':
      query = `SELECT id, title
      FROM quizzes
      WHERE is_public = true
      ORDER BY created_at DESC
      LIMIT $1`;
      break;
    case 'popular':
      query = `SELECT quizzes.id, title, COUNT(attempts.id) AS submissions
      FROM quizzes
      JOIN attempts ON quizzes.id = attempts.quiz_id
      WHERE is_public = true
      GROUP BY quizzes.id
      ORDER BY submissions DESC
      LIMIT $1`;
      break;
    case 'long':
      query = `SELECT quizzes.id, title, COUNT(questions.id) AS num_questions
      FROM quizzes
      JOIN questions ON quizzes.id = questions.quiz_id
      WHERE is_public = true
      GROUP BY quizzes.id
      ORDER BY num_questions DESC
      LIMIT $1`;
      break;
    case 'short':
      query = `SELECT quizzes.id, title, COUNT(questions.id) AS num_questions
      FROM quizzes
      JOIN questions ON quizzes.id = questions.quiz_id
      WHERE is_public = true
      GROUP BY quizzes
      ORDER BY num_questions
      LIMIT $1`;
      break;
    case 'trending':
      query = `SELECT quizzes.id, title, COUNT(attempts.id) AS recent_submissions
      FROM quizzes
      JOIN attempts ON quizzes.id = attempts.quiz_id
      WHERE is_public = true
      AND attempts.finished_at > 
      GROUP BY quizzes
      ORDER BY num_questions
      LIMIT $1`;
      break;
  };
  return db.query(query, [limit])
  .then(results => {
    return results.rows;
  })
  .catch(err => {
    console.log("Home page query went horribly wrong", err);
  });
};

module.exports = {loadPublicQuizzes};
