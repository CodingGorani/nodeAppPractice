var express = require('express');
var app = express();
var router = express.Router();
var path = require('path');
var mysql = require('mysql');
require('dotenv').config();

var connection = mysql.createConnection({
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  user: process.env.DB_USER,
  password: process.env.DB_PW,
  database: process.env.DB_NAME,
});

connection.connect();

router.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '../../public/join.html'));
});

router.post('/', (req, res) => {
  const { email, name, pwd } = req.body;
  var query = connection.query(
    'INSERT INTO user (name, email, pw) VALUES ("' +
      name +
      '", "' +
      email +
      '", "' +
      pwd +
      '")',
    (err, results, fields) => {
      if (err) throw err;
      if (results) {
        res.redirect('/');
      }
    }
  );
});

module.exports = router;
