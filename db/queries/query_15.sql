--This query selects user selected_answer values for a given quiz attempt.

SELECT user_answers.selected_answer
FROM user_answers
  JOIN attempts ON user_answers.attempt_id = attempts.id
WHERE attempts.id = 1 --This is a placeholder; it should be replaced with the ID of the attempt in question/
