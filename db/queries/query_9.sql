--This query inserts a new row into the questions table for each of a user's questions when they create a new quiz.

--We will need to ensure that each question in a newly-created quiz is entered as a separate row (i.e. that this query runs for each question on the quiz).

INSERT INTO questions (quiz_id, question_num, text)
VALUES (1,1,'How cool is this quiz?') -- Note: This is all dummy data.

--We will need to replace quiz_id with the id of the new quiz that was just autoincremented in query_8.sql (or find some way to chain this insert query with that one).

--We will need to replace question_num and text with their values from the form.
