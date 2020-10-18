/*
 * All routes for /result/... are defined here
 * See README for a list of routes.
 */

const express = require('express');
const router  = express.Router();
const { getAttemptData } = require('../db/helpers/result_helpers.js')

/* The "db" argument is a Postgres Pool object */
const resultRouter = (db) => {
  router.get("/:attemptid", (req, res) => {
    const attemptId = req.params.attemptid;
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
