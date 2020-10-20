const format = require('pg-format');

const malicious = `Robert'); DROP TABLE students; --`;

const query = `INSERT INTO students (name) VALUES ('${format(malicious)}');`;

console.log(query);
console.log(format(query));

// LightBnB vanilla verison -> db.query(query, [item1, item2]);
