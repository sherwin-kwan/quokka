/*
 * All routes for /result/... are defined here
 * See README for a list of routes.
 */

const express = require('express');
const router  = express.Router();
const { getAttemptData, getQuestionData } = require('../db/helpers/result_helpers.js')

/* The "db" argument is a Postgres Pool object */
const resultRouter = (db) => {
  router.get("/:attemptid", (req, res) => {
    const attemptId = req.params.attemptid;
    const questionCallback = function(questions) {
      for (const question of questions) {
        console.log("\n\n\n\n\n\n",question, "\n\n\n\n\n\n")
      }
    };
    console.log(getQuestionData(attemptId, db, questionCallback));

    getAttemptData(attemptId, db)
      .then(results => {
        if (results) {
          const templateVars = { results };
          res.render("../views/pages/result", templateVars);
        } else {
          res.send(`No results found for attempt ID ${attemptId}`);
        }
      })
      .catch(err => console.log(err));
  });
  return router;
};

module.exports = resultRouter;
