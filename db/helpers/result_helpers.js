//Check to see if there is an attempt ID in the DB:

const { Pool } = require('pg');

const pool = new Pool({
});

const returnIfAttemptExists = function(attemptID) {
  const queryString = `SELECT *
  FROM attempts
  WHERE id = $1
  `
  const queryParams = [attemptID]
  return pool.query(queryString,queryParams)
    .then(res => res.rows)
}

console.log(returnIfAttemptExists(1))
