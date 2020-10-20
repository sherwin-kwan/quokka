/*
 * All routes for /user/... are defined here
 * See README for a list of routes.
 */

const express = require('express');
const router = express.Router();

/* The "db" argument is a Postgres Pool object */
const userRouter = (db) => {

  // Login page
  router.get('/login', (req, res) => {
    res.send(`This is the login page:
    <form action='login' method='POST'>
      <button type='submit'>Log In</buton>
    </form>`);
  });

  router.post('/login', (req, res) => {
    res.send('This is where you either logged in or got a password error');
  });

  router.get('/register', (req, res) => {
    res.send(`This is the registration page:
    <form action='register' method='POST'>
      <button type='submit'>Register</buton>
    </form>`);
  });

  router.post('/register', (req, res) => {
    res.send('Yay you just registered for Quokka! Welcome to the club!');
  });

  // User profile page. Fetches a template (until it's ready, right now it just displays dummy text)
  router.get("/:id", (req, res) => {
    const userId = req.params.id;
    res.send(`This is the future profile page for user ${userId}`);
  });

  return router;
};

module.exports = userRouter;
