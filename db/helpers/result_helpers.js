//Check to see if there is an attempt ID in the DB:

const returnAttemptGivenID = function(attemptID, db) {
  const queryString = `
    SELECT *
    FROM attempts
    WHERE id = $1
  `;
  const queryParams = [attemptID];
  return db.query(queryString, queryParams)
    .then(res => res.rows[0])
    .catch(err => console.log(err))
};

module.exports = { returnAttemptGivenID }
