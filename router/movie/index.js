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

router.get('/list', (req, res) => {
  res.render('movie.ejs');
});

router.get('/', (req, res) => {
  var responseData = {};

  var query = connection.query('SELECT title FROM movie', (err, rows) => {
    if (err) throw err;
    if (rows.length !== 0) {
      console.log(rows);
      responseData.result = 1;
      responseData.data = rows;
    } else {
      responseData.result = 0;
    }
    res.json(responseData);
  });
});

router.post('/', (req, res) => {
  var { title, type, grade, actor } = req.body;
  connection.query(
    'SELECT * FROM movie where title = ?',
    title,
    (err, results) => {
      if (err) throw err;
      if (results.length !== 0) return res.json({ result: 2 });

      connection.query('INSERT INTO movie SET ?', req.body, (err, results) => {
        if (err) throw err;
        return res.json({ result: 1 });
      });
    }
  );
});

module.exports = router;
