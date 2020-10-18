/*
 * All other routes (other than /quiz, /result, or /user) are defined here
 * See README for a list of routes.
 */

const express = require('express');
const router  = express.Router();

const mainRouter = (db) => {
  // Home page
  // Warning: avoid creating more routes in this file!
  // Separate them into separate routes files (see above).
  router.get("/", (req, res) => {
    res.render("pages/index.ejs");
  });

  // Catch-all code for non-existent routes. If the route doesn't match anything above, it will send this 404 page:
  router.use((req, res) => {
    res.status(404).render('error');
    const templateVars = new Object;
    templateVars.message = `The page you're looking for could not be found.`;
    res.render('pages/error.ejs', templateVars);
  });

  return router;
};

module.exports = mainRouter;
