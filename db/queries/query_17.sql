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
            WHERE attempts.id = 3
        ) THEN 1 ELSE 0 END AS user_selected
        FROM possible_answers
        WHERE possible_answers.question_id = questions.id
      ) filtered_answers
    )
  AS answer_options
  FROM questions
    JOIN quizzes ON questions.quiz_id = quizzes.id
    JOIN attempts ON quizzes.id = attempts.quiz_id
  WHERE attempts.id = 3
