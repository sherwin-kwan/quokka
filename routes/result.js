/*
 * All routes for /result/... are defined here
 * See README for a list of routes.
 */

const express = require('express');
const router  = express.Router();
const { returnAttemptGivenID } = require('../db/helpers/result_helpers.js')

/* The "db" argument is a Postgres Pool object */
const resultRouter = (db) => {
  router.get("/:attemptid", (req, res) => {
    const attempt_id = req.params.attemptid;
    const templateVars = {

    }
    returnAttemptGivenID(attempt_id, db)
    .then(results => {
      if (results) {
        res.render("../views/pages/result", templateVars);
      } else {
        res.send(`No results found for attempt ID ${attempt_id}`);
      }
    })
    .catch(err => console.log(err));
  });
  return router;
};

module.exports = resultRouter;
