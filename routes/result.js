/*
 * All routes for /result/... are defined here
 * See README for a list of routes.
 */

const express = require('express');
const router  = express.Router();

/* The "db" argument is a Postgres Pool object */
const resultRouter = (db) => {
  router.get("/:attemptid", (req, res) => {
    const attempt_id = req.params.attemptid;
    res.send(`This is the future home of results page for attempt ${attempt_id}`);
  });
  return router;
};

module.exports = resultRouter;
