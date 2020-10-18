--This query inserts a new row into the user_answers table for a user's possible_answer selection for one question.

--We will need to ensure that each question's selection is entered as a separate row when a user submits a quiz (i.e. that this query runs for each question on the quiz).

INSERT INTO user_answers (attempt_id, selected_answer)
VALUES((
  SELECT id
  FROM attempts
  WHERE user_id = 1 AND quiz_id =1 --Note: The user_id (1) and quiz_id (1) values are placeholders here. They should be set as the appropriate user_id and quiz_id.
  ORDER BY started_at DESC
  LIMIT 1
), 1) --Note: "1" is a placeholder here and will need to be replaced with the possible_answer id the user selected.
