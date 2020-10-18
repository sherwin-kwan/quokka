--This query selects the questions of a quiz given a quiz ID, and orders them by question_num:

SELECT text
FROM questions
WHERE quiz_id = 1 --Note: Placeholder. This should be changed to a the appropriate quiz_id.
ORDER BY question_num
