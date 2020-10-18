--This query updates the finished_at timestamp of an "attempts" row after the user submits the quiz they are taking.

UPDATE attempts
SET finished_at = NOW()
WHERE id = (
  SELECT id
  FROM attempts
  WHERE user_id = 1 AND quiz_id =1 ----Note: The user_id (1) and quiz_id (1) values are placeholders here. They should be set as the appropriate user_id and quiz_id.
  ORDER BY started_at DESC
  LIMIT 1
)
