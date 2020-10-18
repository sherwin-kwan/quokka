--This query inserts a new row into the "attempts" query. It leaves "cIt is for use when a user clicks "take quiz" on screen B1.

INSERT INTO attempts (user_id, quiz_id, started_at)
VALUES(1, 1, NOW()) ----Note: The user_id (1) and quiz_id (1) values are placeholders here. They should be set as the appropriate user_id and quiz_id when this query is run.
