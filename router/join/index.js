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
  console.log('This is a join page');
  res.render('join.ejs', { message: msg });
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
  'local-join',
  new LocalStrategy(
    {
      usernameField: 'email',
      passwordField: 'pw',
      passReqToCallback: true,
    },
    function (req, email, pw, done) {
      console.log('local-join callback called');
      connection.query(
        'select * from user where email = ?',
        [email],
        function (err, results, fields) {
          if (err) return done(err);
          if (results.length !== 0) {
            return done(null, false, {
              message: 'You have already joined our website',
            });
          } else {
            const sql = { email: email, pw: pw, user_id: uuidv4() };
            connection.query('insert into user set ?', sql, (err) => {
              if (err) return done(err);
              return done(null, { email: email, id: sql.user_id });
            });
          }
        }
      );
    }
  )
);

router.post(
  '/',
  passport.authenticate('local-join', {
    successRedirect: '/main',
    failureRedirect: '/join',
    failureFlash: true,
  })
);

module.exports = router;
