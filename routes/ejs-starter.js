const express = require('express');
const router  = express.Router();

module.exports = () => {
  router.get("/", (req, res) => {
    res.render("pages/index.ejs");
  });
  
  router.get("/quiz/new", (req, res) => {
    res.render("pages/quiz-new.ejs");
  });

  router.get("/quiz/new", (req, res) => {
    res.render("pages/quiz-new.ejs");
  });

  router.get("/quiz/:id", (req, res) => {
    res.render("pages/quiz-play.ejs");
  });

  router.get("/result/:id", (req, res) => {
    res.render("pages/result.ejs");
  });

  router.get("/user/:id", (req, res) => {
    res.render("pages/user.ejs");
  });


  return router;
};
