# Quokka
=========

## Welcome to Quokka!

* Create quizzes full of trivia questions to entertain (or stump) your friends!

## Screenshots

Insert screenshots here

## Stack

* Node
* PostgreSQL
* Express
* jQuery
* SASS

## Routes

Route | Method | Type | Permissions |  Purpose
---|---|---|---|---
PAGE A | --- | --- | ---|---
/ | GET | Template page | All | homepage (landing page showing all public quizzes)
PAGE B | --- | --- | ---
/quiz/:id | GET | Template page | users | quiz page, by default goes to landing page for the quiz
/api/question/:id | GET | Endpoint | users | async displays one question on quiz page (would be called multiple times when taking a quiz)
/quiz/:id | POST | Submit | users | Submit a quiz
PAGE C | --- | --- | ---
/quiz/new | GET | Template page | users | create new quiz page
/quiz/new | POST | Submit | users | submit a new quiz
PAGE D | --- | --- | ---
/user/:id | GET | Templage page | That user (?) | Get user profile
/api/myresults/:userid | GET | Endpoint | That user | Get user's results as JSON, to async display on user profile page
/api/myquizzes/:userid | GET | Endpoint | That user | Get user's created quizzes as JSON, to async display on user profile page
PAGE E | --- | --- | ---
/result/:attemptid | GET | Template page | All | See results of a previous attempt
STRETCH | --- | --- | ---
/start/login | GET | Template page | people not logged in | login page
/start/register | GET | Template page | people not logged in | user registration page
/start/login | POST | Submit | people not logged in | submit login username + password
/start/register | POST | Submit | people not logged in | register new account



## Getting Started

Insert stuff about creating the .env file and connecting to a database, seeding, etc. here

3. Install dependencies: `npm i`
4. Fix to binaries for sass: `npm rebuild node-sass`
5. Reset database: `npm run db:reset`
  - Check the db folder to see what gets created and seeded in the SDB
7. Run the server: `npm run local`
  - Note: nodemon is used, so you should not have to restart your server
8. Visit `http://localhost:8080/`

## Warnings & Tips

- All CSS files are auto-generated using SASS. Please don't edit the .css files directly, edit the .scss files

## Dependencies

- Node 10.x or above
- NPM 5.x or above
- PG 6.x

## Copyright Notices

(C) 2020 Chantal Snazel, Sherwin Kwan, Will Portman. TBD insert information about open-source licenses and terms of use here blah blah blah
