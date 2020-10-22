//Given an attempt ID, select data about the attempt:
const getAttemptData = function(attemptId, db) {
  const queryString = `
    SELECT
      quizzes.title AS title,
      users.fname AS fname,
      users.lname AS lname,
      SUM(CASE WHEN possible_answers.is_correct = true THEN 1 ELSE 0 END) AS num_correct,
      COUNT(user_answers.*) AS num_total,
      ROUND((SUM(CASE WHEN possible_answers.is_correct = true THEN 1 ELSE 0 END)/1.00) / (COUNT(user_answers.*)/1.00)*100) AS percent_correct,
      quizzes.id AS quiz_id,
      attempts.id as attempt_id,
      attempts.finished_at as timestamp
    FROM attempts
      JOIN quizzes ON attempts.quiz_id = quizzes.id
      LEFT JOIN users ON attempts.user_id = users.id
      JOIN user_answers ON attempts.id = user_answers.attempt_id
      JOIN possible_answers ON user_answers.selected_answer = possible_answers.id
    WHERE attempts.id = $1
    GROUP BY quizzes.title, quizzes.id, users.fname, users.lname, attempts.id, attempts.finished_at
  `;
  const queryParams = [attemptId];
  return db.query(queryString, queryParams)
    .then(res => res.rows[0])
    .catch(err => console.error('query error', err.stack));
};

//Given an attempt ID, load a JSON of the quiz attempted (questions & answer options with is_correct and user_selected fields):
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
        ORDER BY RANDOM()
      ) filtered_answers
    )
  AS answer_options
  FROM questions
    JOIN quizzes ON questions.quiz_id = quizzes.id
    JOIN attempts ON quizzes.id = attempts.quiz_id
  WHERE attempts.id = $1
  `;
  const queryParams = [attemptId];
  return db.query(queryString, queryParams)
    .then(res => res.rows)
    .catch(err => console.error('query error', err.stack));
};

//The below function handles the date for the results page:
const processTime = (date) => {
  const now = new Date(); // creates a date object for "right now"
  if (date > now) {
    // The quiz is timestamped in the future
    return 'in the future';
  } else if (now - date < 86400000) {
    // The quiz was taken less than 24 hours ago
    // First check if it was posted more than 1 hour ago
    if (now - date > 3600000) {
      return `${Math.floor((now - date) / 3600000)} hours ago`;
    } else if (now - date > 60000) { // Minutes
      return `${Math.floor((now - date) / 60000)} minutes ago`;
    } else if (now - date > 1000) { // Seconds
      return `${Math.floor((now - date) / 1000)} seconds ago`;
    } else {
      return 'just now';
    }
  }
  // The quiz was posted more than 24 hours ago. The function will return X days/months/years ago based on calendar months and years.
  const yearsAgo = now.getFullYear() - date.getFullYear();
  if (yearsAgo === 1) {
    return 'last year';
  } else if (yearsAgo) {
    return `${yearsAgo} years ago`;
  }
  const monthsAgo = now.getMonth() - date.getMonth();
  if (monthsAgo === 1) {
    return 'last month';
  } else if (monthsAgo) {
    return `${monthsAgo} months ago`;
  }
  const daysAgo = now.getDate() - date.getDate();
  if (daysAgo === 1) {
    return 'yesterday';
  } else {
    return `${daysAgo} days ago`;
  }
};

module.exports = { getAttemptData, loadWholeQuizJson, processTime };
