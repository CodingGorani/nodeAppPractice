var express = require('express');
app = express();
router = express.Router();
path = require('path');
mysql = require('mysql');
passport = require('passport');
LocalStrategy = require('passport-local').Strategy;
const { v4: uuidv4 } = require('uuid');

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
  var msg;
  var errmsg = req.flash('error');
  if (errmsg) msg = errmsg;
  console.log('This is a login page');
  res.render('login.ejs', { message: msg });
});

passport.serializeUser(function (user, done) {
  console.log('passport session save : ', user.id);
  done(null, user.id);
});

passport.deserializeUser(function (id, done) {
  console.log('passport session getData : ', id);
  connection.query(
    'select * from user where user_id = ?',
    [id],
    function (err, results) {
      done(err, results);
    }
  );
});

passport.use(
  'local-login',
  new LocalStrategy(
    {
      usernameField: 'email',
      passwordField: 'pw',
      passReqToCallback: true,
    },
    function (req, email, pw, done) {
      console.log('local-login callback called');
      connection.query(
        'select * from user where email = ?',
        [email],
        function (err, results, fields) {
          if (err) return done(err);
          if (results.length === 0) {
            return done(null, false, {
              message: 'You Need To Join Our Website',
            });
          } else {
            connection.query(
              'select * from user where pw = ?',
              [pw],
              function (err, results) {
                if (err) return done(err);
                if (results.length === 0) {
                  return done(null, false, { message: 'Wrong Pw' });
                } else {
                  console.log('working really really well');
                  return done(null, { email: email, id: results[0].user_id });
                }
              }
            );
          }
        }
      );
    }
  )
);

router.post('/', function (req, res, next) {
  console.log(req.body);
  passport.authenticate('local-login', function (err, user, info) {
    if (err) {
      return res.status(500).json(err);
    }
    if (!user) {
      return res.status(401).json(info.message);
    }
    req.logIn(user, function (err) {
      if (err) {
        return next(err);
      }
      return res.json(user);
    });
  })(req, res, next);
});

module.exports = router;
