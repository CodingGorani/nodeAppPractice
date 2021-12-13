var express = require('express');
var app = express();
var cors = require('cors');
var bodyParser = require('body-parser');

app.listen(3030, () => {
  console.log('App is listening 3030');
});
app.use(express.static('public'));
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded());
app.set('view engine', 'ejs');

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/public/main.html');
});

app.post('/search', (req, res) => {
  console.log(req.body.query);
  var responseData = { query: 'this is a test' };
  res.json(responseData);
});
