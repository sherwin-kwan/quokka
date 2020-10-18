--This query returns the title & score of every quiz a user has taken, ordered from most-to-least-recently taken.

SELECT
  quizzes.title as title,
  -- attempts.finished_at AS date_submitted,
  ROUND((SUM(CASE WHEN possible_answers.is_correct = true THEN 1 ELSE 0 END)/1.00) / (count(user_answers.*)/1.00)*100) as percent_correct --Explanation for dividing the numerator & denominator each by 1.00: http://shorturl.at/cmvxE
  --Note: We can select add'l fields as needed here, based on what we want to display.
FROM quizzes
  JOIN attempts ON quizzes.id = attempts.quiz_id
  JOIN user_answers ON attempts.id = user_answers.attempt_id
  JOIN possible_answers ON user_answers.selected_answer = possible_answers.id
WHERE attempts.user_id = 1 --Note: This is a placeholder; we'll need to use the ID of the logged-in user.
GROUP BY quizzes.title, attempts.finished_at
ORDER BY date_submitted DESC
