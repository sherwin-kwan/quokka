-- Drop and recreate the 6 tables for Quokka
-- For ERD, see https://app.diagrams.net/?libs=general;er#G1TczxC-KgQgInqIFQAoychLMfYxKuitpk

DROP TABLE IF EXISTS users CASCADE;
DROP TABLE IF EXISTS quizzes CASCADE;
DROP TABLE IF EXISTS questions CASCADE;
DROP TABLE IF EXISTS possible_answers CASCADE;
DROP TABLE IF EXISTS attempts CASCADE;
DROP TABLE IF EXISTS user_answers CASCADE;

CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  username VARCHAR(50) UNIQUE NOT NULL,
  password VARCHAR(100) NOT NULL,
  fname VARCHAR(50),
  lname VARCHAR(50)
);

CREATE TABLE quizzes (
  id SERIAL PRIMARY KEY,
  creator_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
  title VARCHAR(100) NOT NULL,
  description TEXT,
  created_at TIMESTAMP,
  is_public BOOLEAN
);

CREATE TABLE questions (
  id SERIAL PRIMARY KEY,
  quiz_id INTEGER REFERENCES quizzes(id) ON DELETE CASCADE,
  question_num SMALLINT NOT NULL,
  text TEXT NOT NULL
);

CREATE TABLE possible_answers (
  id SERIAL PRIMARY KEY,
  question_id INTEGER REFERENCES questions(id) ON DELETE CASCADE,
  answer_text TEXT,
  is_correct BOOLEAN
);

CREATE TABLE attempts (
  id SERIAL PRIMARY KEY,
  user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
  quiz_id INTEGER REFERENCES quizzes(id) ON DELETE CASCADE,
  started_at TIMESTAMP,
  finished_at TIMESTAMP
);

CREATE TABLE user_answers (
  id SERIAL PRIMARY KEY,
  attempt_id INTEGER REFERENCES attempts(id) ON DELETE CASCADE,
  selected_answer INTEGER REFERENCES possible_answers(id) ON DELETE CASCADE
);
