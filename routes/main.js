/*
 * All other routes (other than /quiz, /result, or /user) are defined here
 * See README for a list of routes.
 */

const express = require('express');
const router  = express.Router();
const { loadPublicQuizzes } = require('../db/helpers/home_helpers');
const { getCurrUser } = require('./cookie-helper');

const mainRouter = (db) => {
  // Home page
  // Warning: avoid creating more routes in this file!
  // Separate them into separate routes files (see above).
  router.get("/", (req, res) => {
    let user = getCurrUser(req);
    loadPublicQuizzes('popular', 16, 0, db) // sorting method, limit, page number, database
    .then(results => {
      // console.log(results);
      let parsedResults = [];
      for (let quiz of results) {
        parsedResults.push({link:`/quiz/${quiz.id}`, title:quiz.title});
      }
      console.log(parsedResults);
      res.render("pages/index.ejs", {quizzes:parsedResults, user});
    })
    .catch(err => {
      res.render("pages/index.ejs", {quizzes:undefined, user});
    })
  });

  // Asynchronous route to populate the next page of quizzes
  router.post('/', (req, res) => {
    let inputs =req.body;
    if (inputs.procedure === 'more') {
      loadPublicQuizzes(inputs.sort, 16, inputs.currentPage + 1, db)
      .then(results => {
        res.send(JSON.stringify(results));
      });
    }
    console.log(req.body);
  })

  // Catch-all code for non-existent routes. If the route doesn't match anything above, it will send this 404 page:
  router.use((req, res) => {
    let user = getCurrUser(req);

    res.status(404).render('pages/error.ejs', {message: `The page you're looking for could not be found.`, user});
  });

  return router;
};

module.exports = mainRouter;
