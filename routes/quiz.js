/*
 * All routes for /quiz/... are defined here
 * See README for a list of routes.
 */

// ONLY NEED TO UNCOMMENT THESE LINES IF TESTING DB QUERIES IN NODE
/*require('dotenv').config();
const { Pool } = require('pg');
const dbParams = require('../lib/db.js');
const database = new Pool(dbParams);
database.connect();*/

const express = require('express');
const router = express.Router();
const { loadWholeQuizJson, saveQuizAttempt, saveNewQuiz, changeIsPublicBoolean } = require('../db/helpers/quiz_helpers.js');
const { getCurrUser } = require('./cookie-helper')
const inspect = require('util').inspect;

const quizRouter = (db) => {

  // Load a quiz asynchronously
  router.get('/:id/load', (req, res) => {
    loadWholeQuizJson(req.params.id, db)
      .then(arrayOfObjects => {
        res.send(arrayOfObjects);
      })
      .catch(err => console.error('error sending json to front end', err.stack));
  });

  // Create a new quiz (template page)
  router.get('/new', (req, res) => {
    let user = getCurrUser(req);
    if (!req.session.currentUser) { // If already logged in
      res.render('pages/login-register.ejs', { message: 'You need to log in before creating a quiz.', procedure: 'login', user });
      return;
    }
    res.render('pages/quiz-new.ejs', { user });
  });

  // Submit a quiz
  router.post('/new', (req, res) => {
    let user = getCurrUser(req);
    if (!req.session.currentUser) { // If logged out?
      res.render('pages/login-register.ejs', { message: 'You need to log in before creating a quiz.', procedure: 'login', user });
      return;
    }
    saveNewQuiz(req.session.currentUser, req.body, db)
      .then(data => {
        console.log('Full data array is: ', data);
        if (data[2]) {
          const numOfQuestions = data[1].length;
          const numOfAnswers = data[2].flat().length;
          res.status(201).send(JSON.stringify([numOfQuestions, numOfAnswers, `/quiz/${data[0]}?status=created&questions=${numOfQuestions}`])); // Sends the URL to redirect the user to
        } else { // Error in the saving process
          res.status(400).send(JSON.stringify(data)); // Will send an array [quizId, array of questions, array of answers] so the user knows
          // how much of the data was saved
        }
      })
      .catch(err => {
        console.log(err, err.stack);
        res.status(400).send('Error saving quiz' + err.stack); // Will send an array [quizId, array of questions, array of answers] so the user knows
        // how much of the data was saved
      });
  });

  // Display quiz page (page B) - this will instead render a template once that file is done
  router.get("/:id", async (req, res) => {
    let user = getCurrUser(req);
    try {
      const data = await db.query(`SELECT users.id AS user_id, users.fname AS creator, title, description
      FROM quizzes
      JOIN users ON quizzes.creator_id = users.id
      WHERE quizzes.id = $1`, [req.params.id]);
      console.log(data.rows);
      const templateVars = {
        title: data.rows[0].title,
        description: data.rows[0].description,
        creator: data.rows[0].creator,
        user
      };
      // If user reaches this page after a redirect, interpret the info in the URL string to display a message
      const queryParams = req.query;
      if (queryParams.status === 'created' && data.rows[0].user_id === user) {
        templateVars.message = `Congrats! Your new quiz with ${queryParams.questions} questions has been saved!`;
      } else {
        templateVars.message = '';
      }
      res.render('pages/quiz-play.ejs', templateVars);
    } catch (err) {
      console.error('error retrieving quiz title and description', err.stack);
      res.render('pages/error.ejs', {
        message: `Your quiz could not be retrieved. If you reached this page via a link, please ask the person
        who sent you this link to double-check that it's correct.`, user
      });
    }
  });

  //Update isPublic status of quiz
  router.post('/:quiz_id/public', (req, res) => {
    changeIsPublicBoolean(req.params.quiz_id, db)
      .then(result => {
        console.log(result)
        res.status(201).send();
      })
      .catch(err => {
        console.error('Error:', err.stack);

        res.status(500).json({ error: err.message });

      });
  });

  // Submit a quiz attempt
  router.post('/:quiz_id', (req, res) => {
    console.log('Reached the server!!');
    saveQuizAttempt(req.session.currentUser, req.params.quiz_id, req.body, db)
      .then((data) => {
        res.status(201).send(data.rows);
      })
      .catch(err => {
        res.status(400).send(err);
      });
  });

  return router;
};


module.exports = quizRouter;
