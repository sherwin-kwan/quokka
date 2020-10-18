const express = require('express');
const router  = express.Router();

module.exports = () => {
  router.get("/", (req, res) => {
    res.render("pages/index.ejs");
  });

  router.get("/quiz/:id", (req, res) => {
    res.render("pages/quiz-play.ejs");
  });

  return router;
}