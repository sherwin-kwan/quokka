--This query inserts a new row into the questions table for each of a user's questions when they create a new quiz.

INSERT INTO questions (quiz_id, question_num, text)
VALUES (1,1,'How cool is this quiz?') -- Note: This is all dummy data. We will need to replace quiz_id with the id of the new quiz that was just autoincremented (see query_8.sql). We will need to replace question_num and text with their values from the form.
