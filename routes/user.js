/*
 * All routes for /user/... are defined here
 * See README for a list of routes.
 */

const bcrypt = require('bcrypt');
const express = require('express');
const router = express.Router();
const { getUserName, getQuizzesCreated, getQuizzesTaken } = require('../db/helpers/user_helpers.js');

/* The "db" argument is a Postgres Pool object */
const userRouter = (db) => {


  // Register:
  router.get('/register', (req, res) => {
    res.render('pages/login_register.ejs', { procedure: 'register' });
  });

  router.post('/register', (req, res) => {
    bcrypt.hash(req.body.password, 8)
      .then((hashedPassword) => {
        return db.query(`INSERT INTO users (fname, lname, username, password) VALUES
          ('${format(req.body.fname)}', '${format(req.body.lname)}', '${format(req.body.username)}', '${hashedPassword}')
          RETURNING *;`);
      })
      .then((newUser) => {
        console.log(newUser.rows[0]);
        res.redirect('/');
      });
  });

  // Login:

  // Login page
  router.get('/login', (req, res) => {
    res.render('pages/login_register.ejs', { procedure: 'login' });
  });

  // Handles login requests. (This is a synchronous POST for now, not an AJAX post)
  // parameters will arrive in an object containing the following: fname, lname, username, password
  router.post('/login', (req, res) => {
    res.send(`Sorry, logging in hasn't been implemented yet`);
  });

  // User profile:
  router.get("/:id", (req, res) => {
    const userId = req.params.id;
    getUserName(userId, db)
      .then(name => {
        if (name) {
          res.render('../views/pages/user')
        } else {
          res.status(404).render('../views/pages/error.ejs', { message: `This profile page could not be retrieved. If you reached this page via a link, please ask the person who sent you this link to double-check that it's correct.` });
        }
      })
      .catch(err => console.error('Error executing query', err.stack));
  });




  return router;
};

module.exports = userRouter;
