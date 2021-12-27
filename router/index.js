var express = require('express');
var app = express();
var router = express.Router();
var path = require('path');

var main = require('./main');
var email = require('./email');
var join = require('./join/index.js');
var login = require('./login/index.js');

router.get('/', (req, res) => {
  console.log('this is a test');
  res.sendFile(path.join(__dirname, '../public/main.html'));
});

router.use('/main', main);
router.use('/email', email);
router.use('/join', join);
router.use('/login', login);

module.exports = router;
