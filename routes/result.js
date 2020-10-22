/*
 * All routes for /result/... are defined here
 * See README for a list of routes.
 */

const express = require('express');
const router = express.Router();
const { getAttemptData, loadWholeQuizJson, processTime } = require('../db/helpers/result_helpers.js');
const { getCurrUser } = require('./cookie-helper');

/* The "db" argument is a Postgres Pool object */
const resultRouter = (db) => {
  router.get("/:attemptid", (req, res) => {
    let user = getCurrUser(req);
    const attemptId = req.params.attemptid;
    console.log('Made it to attempt code');
    getAttemptData(attemptId, db)
    .then(overallResults => {
      console.log('results are', overallResults);
      if (overallResults) {
        overallResults.timestamp = processTime(overallResults.timestamp);
        const templateVars = { overallResults, user };
        loadWholeQuizJson(attemptId, db)
        .then(quizJson => {
          templateVars.quizJson = quizJson;
          res.render("../views/pages/result", templateVars);
        });
      } else {
        res.status(404).render('../views/pages/error.ejs', {message: `Your quiz results could not be retrieved. If you reached this page via a link, please ask the person who sent you this link to double-check that it's correct.`, user});
      }
    })
    .catch(err => console.error('Error:', err.stack));
  });
  return router;
};

module.exports = resultRouter;
