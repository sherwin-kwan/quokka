--This query returns the questions of a quiz given a quiz ID, and orders them by question_num:

SELECT text
FROM questions
WHERE quiz_id = 1 --Note: Placeholder. This should be changed to a variable.
ORDER BY question_num
