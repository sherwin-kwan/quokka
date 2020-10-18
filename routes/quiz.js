/*
 * All routes for /result/... are defined here
 * See README for a list of routes.
 */

const express = require('express');
const router  = express.Router();

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
  })

  // Display quiz page (page B) - this will instead render a template once that file is done
  router.get("/:id", (req, res) => {
    const quizId = req.params.id;
    res.send(`This is the future home of the quiz page for quiz ${quizId}.
    <form action='${req.params.id}' method='POST'><button type='submit'>Submit</button></form>`);
  });

  // Submit a quiz
  router.post('/:id', (req, res) => {
    const quizId = req.params.id;
    res.send(`You just successfully submitted quiz ${quizId}`);
  });

  return router;
};

module.exports = quizRouter;
