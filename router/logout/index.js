var express = require('express');
app = express();
router = express.Router();
path = require('path');
mysql = require('mysql');
passport = require('passport');
LocalStrategy = require('passport-local').Strategy;

router.get('/', (req, res) => {
  console.log('logout!');
  req.logout();
  res.redirect('/login');
});

module.exports = router;
