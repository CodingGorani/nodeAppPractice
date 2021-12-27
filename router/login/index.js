var express = require('express');
var router = express.Router();
var mysql = require('mysql');
const passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;

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
  console.log('this is a login page');
  res.render('login.ejs');
});

module.exports = router;
