const mysql = require('mysql');
const dotenv = require('dotenv');
dotenv.config();

const connection = mysql.createConnection({
  host: process.env.DATABASE_HOST || 'localhost',
  user: process.env.DATABASE_USER || 'root',
  password: process.env.DATABASE_PASSWORD || '',
});

connection.connect((err) => {
  if (err) {
    console.error('Failed to connect to DB. Continuing without DB.');
  } else {
    console.log('Connected to MySQL');
  }
});

module.exports = connection;
