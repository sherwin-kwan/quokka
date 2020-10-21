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
    res.render('pages/quiz-new.ejs');
  });

  // Submit a quiz
  router.post('/new', (req, res) => {
    saveNewQuiz(req.session.currentUser, req.body, db)
    .then(data => {
      console.log(data);
      res.status(201).send(JSON.stringify(data)); // Will send an array [quizId, array of questions, array of answers]
    })
    .catch(err => console.error('Error saving a quiz ' + err.stack));
  });

  // Display quiz page (page B) - this will instead render a template once that file is done
  router.get("/:id", (req, res) => {
    db.query(`SELECT title, description
    FROM quizzes
    WHERE id = $1`, [req.params.id])
      .then(data => {
        console.log(data.rows);
        const templateVars = {
          title: data.rows[0].title,
          description: data.rows[0].description
        };
        res.render('pages/quiz-play.ejs', templateVars);
      })
      .catch(err => {
        console.error('error retrieving quiz title and description', err.stack);
        res.render('pages/error.ejs', {
          message: `Your quiz could not be retrieved. If you reached this page via a link, please ask the person
        who sent you this link to double-check that it's correct.`});
      });
  });

  //Update isPublic status of quiz
  router.post('/:quiz_id/public', (req, res) => {
    changeIsPublicBoolean(req.params.quiz_id, db)
      .then(result => {
        console.log(result)
        res.status(201).send();
      })
      .catch(err =>{
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
