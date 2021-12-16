var express = require('express');
var app = express();
var cors = require('cors');
var bodyParser = require('body-parser');

var router = require('./router/index');

app.listen(3000, () => {
  console.log('start express server on port 3000');
});

app.use(express.static('public'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());
app.set('view engine', 'ejs');
app.use(router);
