/*
 * All routes for /result/... are defined here
 * See README for a list of routes.
 */

const express = require('express');
const router  = express.Router();
const { getAttemptData, loadWholeQuizJson } = require('../db/helpers/result_helpers.js')

/* The "db" argument is a Postgres Pool object */
const resultRouter = (db) => {
  router.get("/:attemptid", (req, res) => {
    const attemptId = req.params.attemptid;
    getAttemptData(attemptId, db)
    .then(overallResults => {
      if (overallResults) {
        const templateVars = { overallResults };
        loadWholeQuizJson(overallResults.quiz_id, db)
        .then(quizJson => {
          templateVars.quizJson = quizJson;
          res.render("../views/pages/result", templateVars);
        })
      } else {
        res.send(`No results found for attempt ID ${attemptId}`);
      }
    })
        .catch(err => console.error('Error executing query', err.stack));
  });
  return router;
};

module.exports = resultRouter;
