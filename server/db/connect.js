const mysql = require('mysql2')
require('dotenv').config()

const db = mysql.createPool({
  // host: '112.124.19.80',
  // user: 'root',
  // password: '666',
  // database: 'test_db',
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  waitForConnections: true,
  connectionLimit: 100,
  connectTimeout: 10000,
});

module.exports = db.promise()