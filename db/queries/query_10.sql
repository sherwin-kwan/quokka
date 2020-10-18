--This query inserts a new row into the possible_answers table when a user creates a new quiz for each of the user's possible_answers to a question on the quiz.

INSERT INTO possible_answers (question_id, answer_text, is_correct)
VALUES (9,'Very cool',true) -- Note: This is all dummy data. We will need to replace question_id with the id of the question that was just autoincremented (see query_9.sql). We will need to replace answer_text and is_correct with their values from the form.
