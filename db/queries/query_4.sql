--This query returns the potential_answers of a question given a question ID, and orders them randomly:

SELECT answer_text
FROM possible_answers
WHERE question_id = 1 --Note: Placeholder. This should be changed to a variable.
ORDER BY RANDOM()
