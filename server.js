// load .env data into process.env
require('dotenv').config();

// Web server config
const PORT       = process.env.PORT || 8080;
const ENV        = process.env.ENV || 'development';
const express    = require('express');
const bodyParser = require('body-parser');
const sass       = require('node-sass-middleware');
const app        = express();
const morgan     = require('morgan');

// PG database client/connection setup
const { Pool } = require('pg');
const dbParams = require('./lib/db.js');
const db = new Pool(dbParams);
db.connect();

// Load the logger first so all (static) HTTP requests are logged to STDOUT
// 'dev' = Concise output colored by response status for development use.
//         The :status token will be colored red for server error codes, yellow for client error codes, cyan for redirection codes, and uncolored for all other codes.
app.use(morgan('dev'));

app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({ extended: true }));

// Send static files in the /public folder to client
app.use('/styles', sass({
  src: __dirname + '/styles',
  dest: __dirname + '/public/styles',
  debug: true,
  outputStyle: 'expanded'
}));
app.use(express.static('public'));

// Routers: these listen to requests for resources on specific paths

<<<<<<< HEAD
const ejsTempRoute = require('./routes/ejs-starter')
// Mount all resource routes
// Note: Feel free to replace the example routes below with your own
app.use("/api/users", usersRoutes(db));
app.use("/api/widgets", widgetsRoutes(db));

app.use("/ejs", ejsTempRoute());
// Note: mount other resources here, using the same pattern above
=======
const userRouter = require('./routes/user');
app.use('/user', userRouter(db));
>>>>>>> master

const quizRouter = require('./routes/quiz');
app.use('/quiz', quizRouter(db));

<<<<<<< HEAD
// Home page
// Warning: avoid creating more routes in this file!
// Separate them into separate routes files (see above).
app.get("/", (req, res) => {
  res.render("index.ejs");
});
=======
const resultRouter = require('./routes/result');
app.use('/result', resultRouter(db));

const mainRouter = require('./routes/main');
app.use('/', mainRouter(db))
// Note: mount other resources here, using the same pattern above
>>>>>>> master

app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}`);
});
