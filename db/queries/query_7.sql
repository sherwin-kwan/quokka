--This query inserts a new row into the user_answers table for a user's possible_answer selection for one question when they submit a quiz.

INSERT INTO user_answers (attempt_id, selected_answer)
VALUES(1, 1) --Note: "1" is a placeholder here and will need to be replaced with the attempt_id and the possible_answer id the user selected.

-- This is one way to get the latest attempt_id, although it could create bugs potentially (e.g. if user has two tabs of same quiz open):
-- (
--   SELECT id
--   FROM attempts
--   WHERE user_id = 1 AND quiz_id =1 --Note: The user_id (1) and quiz_id (1) values are placeholders here. They should be set as the appropriate user_id and quiz_id.
--   ORDER BY started_at DESC
--   LIMIT 1
-- )
