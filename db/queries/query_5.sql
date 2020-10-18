--This query inserts a new row into the "attempts" query; it is for when a user clicks on the "take quiz" button.

INSERT INTO attempts (user_id, quiz_id, started_at)
VALUES(1, 1, NOW()), --Note: The user_id (1) and quiz_id (1) values are placeholders here. They should be set as the appropriate user_id and quiz_id.
