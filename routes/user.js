/*
 * All routes for /user/... are defined here
 * See README for a list of routes.
 */

const bcrypt = require('bcrypt');
const express = require('express');
const router = express.Router();
const { checkUser, getUserName, getQuizzesCreated, getQuizzesTaken } = require('../db/helpers/user_helpers.js');
const { getCurrUser } = require('./cookie-helper');


/* The "db" argument is a Postgres Pool object */
const userRouter = (db) => {

  // Register:
  router.get('/register', (req, res) => {
    let user = getCurrUser(req);
    if (user) { // If already logged in
      res.redirect('/');
      return;
    }
    res.render('pages/login-register.ejs', { procedure: 'register', message: '' , user});
  });

  // Handles new user requests. (This is a synchronous POST for now, not an AJAX post)
  // parameters will arrive in an object containing the following: fname, lname, username, password
  router.post('/register', async (req, res) => {

    const check = await checkUser(req.body.username, db);
    if (check) {
      res.status(400).send(`This username is already taken. If that <em>is</em> you trying to log in, please click on "Log In" instead.`);
      return;
    }
    const hashedPassword = await bcrypt.hash(req.body.password, 8);
    const newUser = await db.query(`INSERT INTO users (fname, lname, username, password) VALUES
          ($1, $2, $3, $4)
          RETURNING *;`, [req.body.fname, req.body.lname, req.body.username, hashedPassword]);

    console.log(newUser.rows[0].id);
    req.session.currentUser = newUser.rows[0].id;
    res.status(200).send('OK');
  });

  // Login:

  // Login page
  router.get('/login', (req, res) => {
    let user = getCurrUser(req);
    if (user) { // If already logged in
      res.redirect('/');
      return;
    }
    res.render('pages/login-register.ejs', { procedure: 'login', message: '', user });
  });


  // Handles login requests
  // Username and password will be submitted as parameters in req.body

  router.post('/login', async (req, res) => {
    // Look up the hashed password for this user
    console.log('Login processing');
    const data = await checkUser(req.body.username, db); // In the format [id, hashed_password]
    const hash = data[1];
    if (!hash) {
      res.status(400).send('Your username does not appear in our database. Perhaps you need to create an account?')
    } else if (!await bcrypt.compare(req.body.password, hash)) {
      res.status(400).send(`Sorry, email and password don't match.`);
    } else {
      console.log('Login OK');
      req.session.currentUser = data[0];
      res.status(200).send('OK');
    }
  });

  // Logging out

  router.get('/logout', (req, res) => {
    req.session = null; // Clears the session cookie
    res.redirect('/user/login');
  });

  // User profile:
  router.get("/:id", (req, res) => {
    let user = getCurrUser(req);
    const userId = req.params.id;
    const queryParams = req.query;
    console.log('userid is: ', userId, 'current user is ', req.session.currentUser);
    // Note: Double equals is used intentionally here; the userId is a string '24' whereas the cookie's ID is an integer 24.
    // If the person viewing the page isn't the person whose profile it is, only public quizzes are displayed
    const ownProfile = (userId == req.session.currentUser) ? true : false;
    getUserName(userId, db)
    .then (name => {
      if (name) {
        const templateVars = { name, user, ownProfile };
        getQuizzesCreated(userId, !ownProfile, db)
        .then(quizzesCreated => {
          templateVars.quizzesCreated = quizzesCreated;
          getQuizzesTaken(userId, !ownProfile, db)
          .then(quizzesTaken => {
            templateVars.quizzesTaken = quizzesTaken;
            console.log(templateVars);
            res.render('../views/pages/user', templateVars);
          });
        });
      } else {
        res.status(404).render('../views/pages/error.ejs', {message: `This profile page could not be retrieved. If you reached this page via a link, please ask the person who sent you this link to double-check that it's correct.`, user});
      }
    })
    .catch(err => console.error('Error executing query', err.stack));
  });


  // User profile:
  router.get("/:id", (req, res) => {
    const userId = req.params.id;
    getUserName(userId, db)
    .then (name => {
      if (name) {
        const templateVars = { name };
        getQuizzesCreated(userId, db)
        .then(quizzesCreated => {
          templateVars.quizzesCreated = quizzesCreated;
          getQuizzesTaken(userId, db)
          .then(quizzesTaken => {
            templateVars.quizzesTaken = quizzesTaken;
            console.log(templateVars);
            res.render('../views/pages/user', templateVars);
          });
        });
      } else {
        res.status(404).render('../views/pages/error.ejs', {message: `This profile page could not be retrieved. If you reached this page via a link, please ask the person who sent you this link to double-check that it's correct.`});
      }
    })
    .catch(err => console.error('Error executing query', err.stack));
  });

  // Bare /user/ redirects to a logged-in user's page
  router.get('/', (req, res) => {
    if (req.session.currentUser) {
      res.redirect(`/user/${req.session.currentUser}`);
    } else {
      res.redirect('/user/login');
    }
  });

  return router;
};

module.exports = userRouter;
