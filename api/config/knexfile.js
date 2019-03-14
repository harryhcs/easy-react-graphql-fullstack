/* eslint-disable global-require, no-console */

require('dotenv').load();

const { EASY_ENV } = process.env;
let details;

if (EASY_ENV === 'production') {
  details = require('./database.prod.js');
} else {
  details = require('./database.dev.js');
}

const { connection } = details;

console.log('Using connection info:');
console.log({
  ...connection,
  password: '*****',
});

module.exports = details;
