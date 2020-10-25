# Quokka
=========

## Welcome to Quokka!

* Create quizzes full of trivia questions to entertain (or stump) your friends!

## Currently Deployed

If you just want to view the app without looking at the code or building it locally, visit https://quokkaquiz.herokuapp.com/

## Screenshots

### Homepage
!["Homepage"](https://github.com/sherwin-kwan/quokka/blob/master/docs/Homepage.png)

### Take a quiz
!["Take quiz 1"](https://github.com/sherwin-kwan/quokka/blob/master/docs/Take_Quiz_Start.png)
!["Take quiz 2"](https://github.com/sherwin-kwan/quokka/blob/master/docs/Take_Quiz.png)

### View quiz results
!["Results 1"](https://github.com/sherwin-kwan/quokka/blob/master/docs/Results_1.png)
!["Results 2"](https://github.com/sherwin-kwan/quokka/blob/master/docs/Results_2.png)

### Create a quiz
!["New quiz"](https://github.com/sherwin-kwan/quokka/blob/master/docs/New_Quiz.png)

### Profile
!["Profile 1"](https://github.com/sherwin-kwan/quokka/blob/master/docs/Profile_Created.png)
!["Profile 2"](https://github.com/sherwin-kwan/quokka/blob/master/docs/Profile_Taken.png)

## Stack

* Node
* PostgreSQL
* Express
* jQuery
* SASS

## Getting Started

To run this application locally, you will need Node installed on your computer, and access to a PostgreSQL database instance.

1. Install dependencies: `npm i`
2. Fix to binaries for sass: `npm rebuild node-sass`
3. Create a file called ".env" in the root directory of this project, with database credentials expressed in a URL, 
as follows. This is used by the _dotenv_ package to connect to the database:
```javascript
DATABASE_URL=postgres://<username>:<password>@<server url>:<port number>/<database name>?sslmode=disable
```
4. Reset database: `npm run db:reset`
  - Check the db folder to see what gets created and seeded in the SDB
5. Run the server: `npm run local`
  - Note: nodemon is used, so you should not have to restart your server
6. Visit `http://localhost:8080/`

## Routes

Route | Method | Type | Permissions |  Purpose
---|---|---|---|---
**PAGE A** | --- | --- | ---|---
/ | GET | Template page | All | homepage (landing page showing all public quizzes)
**PAGE B** | --- | --- | ---
/quiz/:id | GET | Template page | users | quiz page, by default goes to landing page for the quiz
/quiz/:id/load | GET | Endpoint | users | async displays one question on quiz page (would be called multiple times when taking a quiz)
/quiz/:id | POST | Submit | users | Submit a quiz
**PAGE C** | --- | --- | ---
/quiz/new | GET | Template page | users | create new quiz page
/quiz/new | POST | Submit | users | submit a new quiz
**PAGE D** | --- | --- | ---
/user/:id | GET | Templage page | users | Get user profile
/user/:id/results | GET | Endpoint | users | Get user's results as JSON, to async display on user profile page
/users/:id/quizzes | GET | Endpoint | users | Get user's created quizzes as JSON, to async display on user profile page
**PAGE E** | --- | --- | ---
/result/:attemptid | GET | Template page | All | See results of a previous attempt
**STRETCH** | --- | --- | ---
/user/login | GET | Template page | people not logged in | login page
/user/register | GET | Template page | people not logged in | user registration page
/user/login | POST | Submit | people not logged in | submit login username + password
/user/register | POST | Submit | people not logged in | register new account


## Warnings & Tips

- All CSS files are auto-generated using SASS. Please don't edit the .css files directly, edit the .scss files
- This is meant to be viewed in mobile viewports only. You can still access it on a desktop viewport but things may look a little awkward.

## Dependencies

- Node 12.x or above
- NPM 6.x or above
- PG 6.x

## Copyright Notices

(C) 2020 Chantal Snazel, Sherwin Kwan, Will Portman. TBD insert information about open-source licenses and terms of use here blah blah blah
