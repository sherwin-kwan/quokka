--This query selects all of the quiz titles that a user has made given a user_id, ordered from most-to-least-recent.

SELECT title --Note: We can select add'l fields as needed here, based on what we want to display.
FROM quizzes
WHERE creator_id = 1 --Note: This is a placeholder; we'll need to use the user id of the logged-in user.
ORDER BY created_at DESC
