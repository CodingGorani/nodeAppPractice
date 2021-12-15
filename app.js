var express = require('express');
var app = express();
var cors = require('cors');
var bodyParser = require('body-parser');
var mysql = require('mysql');

require('dotenv').config();

var connection = mysql.createConnection({
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  user: process.env.DB_USER,
  password: process.env.DB_PW,
  database: process.env.DB_NAME,
});

app.listen(3000, () => {
  console.log('start express server on port 3000');
});

app.use(express.static('public'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());
app.set('view engine', 'ejs');

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/public/main.html');
});

app.get('/form', (req, res) => {
  res.sendFile(__dirname + '/public/form.html');
});

app.post('/email_post', (req, res) => {
  console.log(req.body.email);
  res.render('email.ejs', { email: req.body.email });
});

app.post('/ajax_send_email', (req, res) => {
  console.log(req.body.email);
  var responseData = { result: 'ok', email: req.body.email };
  res.json(responseData);
});
