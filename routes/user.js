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


  // Load results asynchronously
  router.get('/:id/results', (req, res) => {
    // db.query(/* INSERT QUERY TO GET PAST RESULTS */)
    //   .then(data => {
    //     const users = data.rows;
    //     res.json({ users });
    //   })
    //   .catch(err => {
    //     res
    //       .status(500)
    //       .json({ error: err.message });
    //   });
    res.json({ "notes": "This is the route where user's previous results will pop up",
      "score": "90%", "status": "this page is just a test" });
  });

  // Load the user's quizzes asynchronously
  router.get('/:id/quizzes', (req, res) => {
    // db.query(/* INSERT QUERY TO GET THE USER'S CREATED QUIZZES */)
    //   .then(data => {
    //     const users = data.rows;
    //     res.json({ users });
    //   })
    //   .catch(err => {
    //     res
    //       .status(500)
    //       .json({ error: err.message });
    //   });
    res.json([{ "quiz": "1", "status": "this page is just a test" },
      { "quiz": "2", "status": "this is just a test" }]);
  });

  // User profile page. Fetches a template (until it's ready, right now it just displays dummy text)
  router.get("/:id", (req, res) => {
    const userId = req.params.id;
    res.send(`This is the future profile page for user ${userId}`);
  });

  return router;
};

module.exports = userRouter;
