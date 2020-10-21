/*
 * All other routes (other than /quiz, /result, or /user) are defined here
 * See README for a list of routes.
 */

const express = require('express');
const router  = express.Router();
const { loadPublicQuizzes } = require('../db/helpers/home_helpers');

const mainRouter = (db) => {
  // Home page
  // Warning: avoid creating more routes in this file!
  // Separate them into separate routes files (see above).
  router.get("/", (req, res) => {
    loadPublicQuizzes(db)
    .then(results => {
      // console.log(results);
      let parsedResults = [];
      for (let quiz of results) {
        parsedResults.push({link:`/quiz/${quiz.id}`, title:quiz.title});
      }
      console.log(parsedResults);
      res.render("pages/index.ejs", {quizzes:parsedResults});  
    })
    .catch(err => {
      res.render("pages/index.ejs");
    })
  });

  // Catch-all code for non-existent routes. If the route doesn't match anything above, it will send this 404 page:
  router.use((req, res) => {
    res.status(404).render('pages/error.ejs', {message: `The page you're looking for could not be found.`});
  });

  return router;
};

module.exports = mainRouter;
