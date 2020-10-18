/*
 * All routes for /result/... are defined here
 * See README for a list of routes.
 */

const express = require('express');
const router  = express.Router();

/* The "db" argument is a Postgres Pool object */
const resultRouter = (db) => {
  router.get("/:attemptid", (req, res) => {
    res.send(`This is the future home of results page for attempt ${req.params.attemptid}`);
  });
  return router;
};

module.exports = resultRouter;
