
// Home page
// Warning: avoid creating more routes in this file!
// Separate them into separate routes files (see above).
router.get("/", (req, res) => {
  res.render("index");
});

// Catch-all code for non-existent routes. If the route doesn't match anything above, it will send this 404 page:
router.use((req, res) => {
  res.status(404).render('error');
  const templateVars = new Object;
  templateVars.message = `The page you're looking for could not be found.`;
  res.render('error.ejs', templateVars);
});
