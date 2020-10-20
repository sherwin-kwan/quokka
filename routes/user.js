/*
 * All routes for /user/... are defined here
 * See README for a list of routes.
 */

const express = require('express');
const router = express.Router();
const { getUserName, getQuizzesCreated, getQuizzesTaken } = require('../db/helpers/user_helpers.js');

/* The "db" argument is a Postgres Pool object */
const userRouter = (db) => {

  // User profile:
  router.get("/:id", (req, res) => {
    const userId = req.params.id;
    getQuizzesTaken(userId, db)
      .then (name =>
        res.json(name)
        )
  });


  // Register:
  router.get('/register', (req, res) => {
    res.send(`This is the registration page:
    <form action='register' method='POST'>
      <button type='submit'>Register</buton>
    </form>`);
  });

  router.post('/register', (req, res) => {
    res.send('Yay you just registered for Quokka! Welcome to the club!');
  });


  // Login:
  router.get('/login', (req, res) => {
    res.send(`This is the login page:
    <form action='login' method='POST'>
      <button type='submit'>Log In</buton>
    </form>`);
  });

  router.post('/login', (req, res) => {
    res.send('This is where you either logged in or got a password error');
  });


  return router;
};

module.exports = userRouter;
