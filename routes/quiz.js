/*
 * All routes for /result/... are defined here
 * See README for a list of routes.
 */
require('dotenv').config();
const express = require('express');
const router = express.Router();
const format = require('pg-format');
// const database = require('../server').db;

const { Pool } = require('pg');
const dbParams = require('../lib/db.js');
const database = new Pool(dbParams);
database.connect();

const inspect = require('util').inspect;

// This function creates an array of objects, containing the answers to one question
const loadOneQuestion = (question_id, db) => {
  db.query(`SELECT question_num, text, answer_text
  FROM questions
  JOIN possible_answers ON questions.id = possible_answers.question_id
  WHERE questions.id = ${format(question_id)}
  ORDER BY possible_answers.answer_text;`)
  .then((res) => {
    console.log(res.rows);
  })
  .catch((err) => console.log(`Houston we have a problem!!! ${err}`));
};

console.log(loadOneQuestion('6', database));

const loadOneQuestionJson = (question_id) => {
  database.query(`SELECT question_num, text,
  (SELECT json_agg(filtered_answers) FROM (SELECT id, answer_text FROM possible_answers WHERE question_id = ${format(question_id)}) filtered_answers)
  AS answers
  FROM questions
  WHERE questions.id = ${format(question_id)};
  `)
  .then((res) => {
    console.log(inspect(res.rows[0]));
  })
  .catch((err) => console.log(err));
};

console.log(loadOneQuestionJson('6'));

const quizRouter = (db) => {

  // Load a quiz asynchronously
  router.get('/:id/load', (req, res) => {
    const quizId = req.params.id;

    // db.query(/* INSERT QUERY TO GET QUIZZES */)
    //   .then(data => {
    //     const users = data.rows;
    //     res.json({ users });
    //   })
    //   .catch(err => {
    //     res
    //       .status(500)
    //       .json({ error: err.message });
    //   });
    res.json({
      "notes": "This is the route that will eventually cause a quiz to load",
      "title": "This is a quiz title", "created_by": "Some Body"
    });
  })

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
    const quizId = req.params.id;
    res.send(`This is the future home of the quiz page (page B) for quiz ${quizId}.
    <form action='${req.params.id}' method='POST'>
      <button type='submit'>Submit</button>
    </form>`);
  });


  // Submit a quiz
  router.post('/:id', (req, res) => {
    const quizId = req.params.id;
    res.send(`You just successfully submitted quiz ${quizId}`);
  });

  return router;
};

const testFunction = function(abc) {
  return abc + 1;
}

module.exports = {
  quizRouter,
  testFunction};
