--This query selects the correct values for a quiz, given a quiz attempt ID.

SELECT possible_answers.id
FROM possible_answers
  JOIN questions ON possible_answers.question_id = questions.id
  JOIN quizzes ON questions.quiz_id = quizzes.id
  JOIN attempts ON quizzes.id = attempts.quiz_id
WHERE attempts.id = 4 --This is a placeholder; it should be replaced with the ID of the attempt in question
  AND possible_answers.is_correct = true
