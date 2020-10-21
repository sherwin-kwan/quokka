/*
 * All routes for /user/... are defined here
 * See README for a list of routes.
 */

const bcrypt = require('bcrypt');
const express = require('express');
const router = express.Router();
const { checkUser, getUserName, getQuizzesCreated, getQuizzesTaken } = require('../db/helpers/user_helpers.js');


/* The "db" argument is a Postgres Pool object */
const userRouter = (db) => {

  // Register:
  router.get('/register', (req, res) => {
    if (req.session.currentUser) { // If already logged in
      res.redirect('/');
      return;
    }
    res.render('pages/login-register.ejs', { procedure: 'register' });
  });

  // Handles new user requests. (This is a synchronous POST for now, not an AJAX post)
  // parameters will arrive in an object containing the following: fname, lname, username, password
  router.post('/register', async (req, res) => {

    const check = await checkUser(req.body.username, db);
    if (check) {
      res.status(400).send({ message: 'User already exists. Please log in.' });
      return;
    }
    const hashedPassword = await bcrypt.hash(req.body.password, 8);
    const newUser = await db.query(`INSERT INTO users (fname, lname, username, password) VALUES
          ($1, $2, $3, $4)
          RETURNING *;`, [req.body.fname, req.body.lname, req.body.username, hashedPassword]);

    console.log(newUser.rows[0].id);
    req.session.currentUser = newUser.rows[0].id;
    res.redirect('/');
  });

  // Login:

  // Login page
  router.get('/login', (req, res) => {
    if (req.session.currentUser) { // If already logged in
      res.redirect('/');
      return;
    }
    res.render('pages/login-register.ejs', { procedure: 'login' });
  });


  // Handles login requests
  // Username and password will be submitted as parameters in req.body

  router.post('/login', async (req, res) => {
    // Look up the hashed password for this user
    const data = await checkUser(req.body.username, db); // In the format [id, hashed_password]
    const hash = data[1];
    if (!hash) {
      res.status(404).send('Your username does not appear in our database. Perhaps you need to create an account?')
    } else if (!await bcrypt.compare(req.body.password, hash)) {
      res.status(403).send(`Sorry, email and password don't match.`);
    } else {
      req.session.currentUser = data[0];
      res.redirect('/');
    }
  });

  // Logging out

  router.get('/logout', (req, res) => {
    req.session = null; // Clears the session cookie
    res.redirect('/user/login');
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
