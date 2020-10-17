INSERT INTO attempts (user_id, quiz_id, started_at, finished_at)
VALUES
--An attempt from someone who didn't create a quiz and had one attempt:
--id=1:
(1, 2, '2020-10-11 00:00:00','2020-10-16 00:10:00'),

--An attempt from someone who created a quiz and had one attempt of the quiz they created:
--id=2:
(7, 1, '2020-10-02 01:00:00','2020-10-16 01:10:00'),

--An attempt from someone who created a quiz and had one attempt of a quiz they didn't create:
--id=3:
(35, 3, '2020-10-16 02:00:00','2020-10-16 02:10:00'),


--Two attempts, each of a different quiz, from someone who didn't create a quiz:
--id=4:
(2, 1, '2020-10-05 03:00:00','2020-10-05 03:10:00'),

--id=5:
(2, 2, '2020-10-12 04:00:00','2020-10-16 04:10:00'),

--Two attempts, each of the same quiz, from someone who didn't create a quiz:
--id=6:
(3, 3, '2020-10-16 05:00:00','2020-10-16 05:10:00'),

--id=7:
(3, 3, '2020-10-16 05:15:00','2020-10-16 05:20:00'),

--Two attempts from someone who created a quiz and attempted both the quiz they created & a quiz they didn't create:
--id=8:
(38, 3, '2020-10-16 06:30:00','2020-10-16 06:45:00'),

--id=9:
(38, 1, '2020-10-04 07:00:00','2020-10-04 07:30:00');
