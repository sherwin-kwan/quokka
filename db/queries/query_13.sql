--This query selects quiz title, user fname & lname, and percent_correct for a given attempt ID.

SELECT
  quizzes.title,
  users.fname,
  users.lname,
  ROUND((SUM(CASE WHEN possible_answers.is_correct = true THEN 1 ELSE 0 END)/1.00) / (count(user_answers.*)/1.00)*100) as percent_correct --Explanation for dividing the numerator & denominator each by 1.00: http://shorturl.at/cmvxE
FROM attempts
  JOIN quizzes ON attempts.quiz_id = quizzes.id
  JOIN users ON attempts.user_id = users.id
  JOIN user_answers ON attempts.id = user_answers.attempt_id
  JOIN possible_answers ON user_answers.selected_answer = possible_answers.id
WHERE attempts.id = 1 --Note: This is a placeholder; we'll need to use the ID of the attempt in question.
GROUP BY quizzes.title, users.fname, users.lname, attempts.finished_at
ORDER BY attempts.finished_at DESC
