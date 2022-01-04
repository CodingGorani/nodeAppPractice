var express = require('express');
app = express();
cors = require('cors');
bodyParser = require('body-parser');
passport = require('passport');
LocalStrategy = require('passport-local').Strategy;
session = require('express-session');
flash = require('connect-flash');
router = require('./router/index');
path = require('path');

app.listen(3000, () => {
  console.log('start express server on http://localhost:3000');
});

app.use(express.static(__dirname + '/public'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());
app.set('view engine', 'ejs');
app.use(
  session({
    secret: 'Merry Christmas',
    resave: false,
    saveUninitialized: true,
  })
);

app.use(passport.initialize());
app.use(passport.session());
app.use(flash());

app.use(router);
