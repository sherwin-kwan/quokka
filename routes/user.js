/*
 * All routes for /user/... are defined here
 * See README for a list of routes.
 */

const express = require('express');
const router  = express.Router();

/* The "db" argument is a Postgres Pool object */
const userRouter = (db) => {
  router.get("/", (req, res) => {
    db.query(`SELECT * FROM users;`)
      .then(data => {
        const users = data.rows;
        res.json({ users });
      })
      .catch(err => {
        res
          .status(500)
          .json({ error: err.message });
      });
  });
  return router;
};

module.exports = userRouter;
