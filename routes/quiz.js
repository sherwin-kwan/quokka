/*
 * All routes for /result/... are defined here
 * See README for a list of routes.
 */

const express = require('express');
const router = express.Router();
const format = require('pg-format');

const loadOneQuestion = (question_id, db) => {
  db.query(`SELECT question_num, text, answer_text
  FROM questions
  JOIN possible_answers ON questions.id = possible_answers.questions_id
  WHERE questions.id = $1
  ORDER BY possible_answers.text;`)
}


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

module.exports = quizRouter;
