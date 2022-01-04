var express = require('express');
var app = express();
var router = express.Router();
var path = require('path');

var main = require('./main');
var email = require('./email');
var join = require('./join/index.js');
var login = require('./login/index.js');
var logout = require('./logout/index.js');

router.get('/', (req, res) => {
  console.log('this is a test');
  res.render('main.ejs');
});

router.use('/main', main);
router.use('/email', email);
router.use('/join', join);
router.use('/login', login);
router.use('/logout', logout);

module.exports = router;
