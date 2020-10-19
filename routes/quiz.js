/*
 * All routes for /quiz/... are defined here
 * See README for a list of routes.
 */

// ONLY NEED TO UNCOMMENT THESE LINES IF TESTING DB QUERIES IN NODE
/*require('dotenv').config();
const { Pool } = require('pg');
const dbParams = require('../lib/db.js');
const database = new Pool(dbParams);
database.connect();*/

const express = require('express');
const router = express.Router();
const format = require('pg-format');

/* This function returns a Javascript object representing one question on a quiz, in the format
 {question_num: 1,
questions.text: 'What is the capital of Canada?',
answer_options: [
  {id: 1, answer_text: 'Toronto'},
  {id: 2, answer_text: 'Ottawa'},
  {id: 3, answer_text: 'Vancouver'}
]} */

const loadOneQuestionJson = (question_id, db) => {
  return db.query(`
  SELECT questions.question_num, questions.text,
    (SELECT json_agg(filtered_answers) FROM
      (SELECT id, answer_text
        FROM possible_answers
        WHERE question_id = questions.id
      ) filtered_answers
    )
  AS answer_options
  FROM questions
  WHERE questions.id = ${format(question_id)};
  `)
    .then(res => res.rows)
    .catch(err => console.error('query error', err.stack));
};

/* This function returns an array of Javascript objects representing a whole quiz, each object  of which represents
a single question within that quiz, e.g.:
 [{question_num: 1,
    questions.text: 'What is the capital of Canada?',
    answer_options: [
      {id: 1, answer_text: 'Toronto'},
      {id: 2, answer_text: 'Ottawa'},
      {id: 3, answer_text: 'Vancouver'}
    ]
  },
  {question_num: 2,
    questions.text: 'What is the capital of France?',
    answer_options: [
      {id: 1, answer_text: 'Marseille'},
      {id: 2, answer_text: 'Lille'},
      {id: 3, answer_text: 'Paris'}
    ]
  }] */

const loadWholeQuizJson = (quiz_id, db) => {
  return db.query(`
  SELECT questions.question_num, questions.text,
    (SELECT json_agg(filtered_answers) FROM
      (SELECT id, answer_text
        FROM possible_answers
        WHERE question_id = questions.id
      ) filtered_answers
    )
  AS answer_options
  FROM questions
  WHERE questions.quiz_id = ${format(quiz_id)};
  `)
    .then(res => res.rows)
    .catch(err => console.error('query error', err.stack));
};

// console.log(loadOneQuestionJson('6'));
// console.log(loadWholeQuizJson('2'));

const quizRouter = (db) => {

  // Load a quiz asynchronously
  router.get('/:id/load', (req, res) => {
    const quizId = format(req.params.id);
    loadWholeQuizJson(quizId, db)
      .then(array_of_objects => {
        res.send(array_of_objects);
      })
      .catch(err => console.error('error sending json to front end', err.stack));
  });

  // Create a new quiz (template page)
  router.get('/new', (req, res) => {
    res.send(`This is the future home of the create-a-quiz page (page C)
    <form action='new' method='POST'>
      <button type='submit'>Submit</buton>
    </form>`);
  });

  // Submit a quiz
  router.post('/new', (req, res) => {
    res.send('You successfully created a new quiz, congrats!');
  })

  // Display quiz page (page B) - this will instead render a template once that file is done
  router.get("/:id", (req, res) => {
    const quizId = format(req.params.id);
    db.query(`SELECT title, description
    FROM quizzes
    WHERE id = ${quizId}`)
      .then(data => {
        console.log(data.rows);
        const templateVars = {
          title: data.rows[0].title,
          description: data.rows[0].description
        };
        res.render('pages/quiz-play.ejs', templateVars);
      })
      .catch(err => console.error('error retrieving quiz title and description', err.stack));
  });


  // Submit a quiz
  router.post('/:id', (req, res) => {
    const quizId = req.params.id;
    res.send(`You just successfully submitted quiz ${quizId}`);
  });

  return router;
};


module.exports = quizRouter;


// THE FOLLOWING IS OLD CODE DO NOT USE.
  // const loadOneQuestion = (question_id, db) => {
  //   db.query(`SELECT question_num, text, answer_text
  //   FROM questions
  //   JOIN possible_answers ON questions.id = possible_answers.question_id
  //   WHERE questions.id = ${format(question_id)}
  //   ORDER BY possible_answers.answer_text;`)
  //   .then((res) => {
  //     console.log(res.rows);
  //   })
  //   .catch((err) => console.log(`Houston we have a problem!!! ${err}`));
  // };
