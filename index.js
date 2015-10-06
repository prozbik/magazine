var express = require('express');
var fs = require('fs');
var path = require('path');
var app = express();

app.use(express.static(path.join(__dirname, 'app')));

app.get('/', function (req,res) {
  res.sendFile('/public/index.html');
});


app.listen(3000);
