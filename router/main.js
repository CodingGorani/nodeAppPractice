var express = require('express');
const req = require('express/lib/request');
var app = express();
var router = express.Router();
var path = require('path');
const { nextTick } = require('process');

router.get('/', (req, res) => {
  if (req.user) {
    if (req.user[0].user_id) {
      return res.render('main.ejs');
    }
  } else res.redirect('/main/redirect');
});

router.get('/redirect', (req, res) => {
  res.render('redirect.ejs');
});

module.exports = router;
