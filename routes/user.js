/*
 * All routes for /user/... are defined here
 * See README for a list of routes.
 */

const bcrypt = require('bcrypt');
const express = require('express');
const router = express.Router();
const { getUserName, getQuizzesCreated, getQuizzesTaken } = require('../db/helpers/user_helpers.js');

// Checks if a given username appears in the database. If found, returns their password; otherwise, returns false
const checkUser = (username) => {
  return db.query(`
  SELECT username, password FROM users
  WHERE username = $1`, [username])
    .then((data) => {
      return (data.rows.length) ? data.rows[0].password : false;
    });
};

/* The "db" argument is a Postgres Pool object */
const userRouter = (db) => {

  // Register:
  router.get('/register', (req, res) => {
    res.render('pages/login_register.ejs', { procedure: 'register' });
  });

  // Handles new user requests. (This is a synchronous POST for now, not an AJAX post)
  // parameters will arrive in an object containing the following: fname, lname, username, password
  router.post('/register', async function (req, res) {
    const check = await checkUser(req.body.username);
    if (check) {
      res.status(400).send({ message: 'User already exists' });
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
    res.render('pages/login_register.ejs', { procedure: 'login' });
  });

  // router.post('/login', (req, res) => {
  //   const userID = findUserByEmail(req.body.email, users);
  //   const templateVars = defaultTemplateVars();
  //   // Two checks: 1) does the user exist? 2) does the user enter the correct password?
  //   if (!userID) {
  //     templateVars.message = 'Your email does not appear in our database. Perhaps you need to create an account?';
  //     res.status(403).render('error', templateVars);
  //     return;
  //   }
  //   if (!bcrypt.compareSync(req.body.password, users[userID].password)) {
  //     templateVars.message = 'Sorry, email and password do not match. Please try again.';
  //     res.status(403).render('error', templateVars);
  //     return;
  //   }
  //   // If email and password check out, log the user in and create a session cookie
  //   req.session.userID = userID;
  //   res.redirect('/urls');
  // });


  // Handles login requests
  // Username and password will be submitted as parameters in req.body

  router.post('/login', (req, res) => {
    `SELECT username FROM users
    WHERE username = $1`, [req.body.username]
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
