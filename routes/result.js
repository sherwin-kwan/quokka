/*
 * All routes for /result/... are defined here
 * See README for a list of routes.
 */

const express = require('express');
const router = express.Router();
const { getAttemptData, loadWholeQuizJson } = require('../db/helpers/result_helpers.js');

/* The "db" argument is a Postgres Pool object */
const resultRouter = (db) => {
  router.get("/:attemptid", (req, res) => {
    const attemptId = req.params.attemptid;
    console.log('Made it to attempt code');
    getAttemptData(attemptId, db)
    .then(overallResults => {
      console.log('results are', overallResults);
      if (overallResults) {
        const templateVars = { overallResults };
        loadWholeQuizJson(attemptId, db)
        .then(quizJson => {
          templateVars.quizJson = quizJson;
          console.log(templateVars);
          res.render("../views/pages/result", templateVars);
        });
      } else {
        res.status(404).render('../views/pages/error.ejs', {message: `Your quiz results could not be retrieved. If you reached this page via a link, please ask the person who sent you this link to double-check that it's correct.`});
      }
    })
    .catch(err => console.error('Error:', err.stack));
  });
  return router;
};

module.exports = resultRouter;
