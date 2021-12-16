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
  res.sendFile(path.join(__dirname, '../public/form.html'));
});

router.post('/form', (req, res) => {
  console.log(req.body.email);
  res.render('email.ejs', { email: req.body.email });
});

router.post('/ajax', (req, res) => {
  console.log(req.body.email);
  var email = req.body.email;
  var responseData = {};

  var query = connection.query(
    'select name from user where email="' + email + '"',
    (err, rows) => {
      if (err) throw err;
      if (rows[0]) {
        responseData.result = 'ok';
        responseData.name = rows[0].name;
      } else {
        responseData.result = 'none';
        responseData.name = '';
      }
      res.json(responseData);
    }
  );
});

module.exports = router;
