var express = require('express');
var bodyParser = require('body-parser');
var app = express();

// middleware to parse all json data.
app.use(bodyParser.urlencoded({
  extended: false
}));
app.use(bodyParser.json());

// routes
app.get('/', function (req, res) {
  data = "<html><body><h1>Hello World</h1></body></html>";
  res.end(data);
});

app.post('/', function (req, res) {
  console.log(req.body.name + "-" + req.body.age);

  data = {
    "name": req.body.name,
    "age": req.body.age
  };
  res.json(data);
});

// server
var server = app.listen(8081, function () {

  var host = server.address().address
  var port = server.address().port
  console.log("Example app listening at http://%s:%s", host, port)
})