/*
 * All routes for /user/... are defined here
 * See README for a list of routes.
 */

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
    res.send(`Sorry, we haven't developed the registration feature yet`);
  });

  // Login:

  // Login page
  router.get('/login', (req, res) => {
    res.render('pages/login_register.ejs', { procedure: 'login' });
  });

  router.post('/login', (req, res) => {
    console.log(req.body);
    res.send('This is where you either logged in or got a password error');
  });

  // User profile:
  router.get("/:id", (req, res) => {
    const userId = req.params.id;
    getUserName(userId, db)
      .then (name => {
        if (name) {
          res.render('../views/pages/user')
        } else {
          res.status(404).render('../views/pages/error.ejs', {message: `This profile page could not be retrieved. If you reached this page via a link, please ask the person who sent you this link to double-check that it's correct.`});
        }
      })
      .catch(err => console.error('Error executing query', err.stack));
  });




  return router;
};

module.exports = userRouter;
