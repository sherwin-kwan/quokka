//Check to see if there is an attempt ID in the DB:

const { db } = require('../../server.js');

const returnIfAttemptExists = function(attemptID) {
  const queryString = `SELECT *
  FROM attempts
  WHERE id = $1
  `
  const queryParams = [attemptID]
  return db.query(queryString,queryParams)
    .then(res => console.log(res.rows))
}

returnIfAttemptExists(1)
