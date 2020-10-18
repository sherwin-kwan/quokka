--This query selects the titles of the 10 most recently-created quizzes:

SELECT title
FROM quizzes
ORDER BY created_at DESC --Note: Placeholder; changeable
LIMIT 10 --Note: Placeholder; changeable
