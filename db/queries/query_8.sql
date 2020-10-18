--This query inserts the new quiz data into the quizzes table when a user creates a new quiz.

INSERT INTO quizzes (creator_id, title, description, created_at, is_public)
VALUES (1, 'Cool Quiz', 'Welcome to my cool quiz', Now(), true) --Note: all of this is dummy data except for Now(); we will need to set the appropriate user id & set the inputs from the create-quiz form.
