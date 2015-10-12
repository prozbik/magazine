var express = require('express');
var fs = require('fs');
var path = require('path');
var morgan = require('morgan');
var bodyParser = require('body-parser');
var multer = require('multer');
var mongoose = require('mongoose');
var expressLayouts = require('express-ejs-layouts');
var jwt = require('jsonwebtoken');
var jwtSecret = 'fokeowkfow123KLfq/ekfoweo';
var ls = require('local-storage');
/* config */
var config = require('./config/app');
/* controllers */
var adminUserRoute = require('./routes/users');
var adminBlogRoute = require('./routes/articles');
var adminGoodsRoute = require('./routes/goods');
// /* API */
var api = require('./routes/api');
/* app */
var app = express();

var page = require('./config/pages');
/*set settings*/
app.set('view engine', 'ejs');
app.set('layout', 'layout')
app.set('views', path.join(__dirname, 'views'));
app.set("layout extractScripts", true)


app.use(expressLayouts);
app.use(morgan('dev'));
app.use(express.static(path.join(__dirname, 'app')));
app.use(bodyParser.urlencoded());
app.use(bodyParser.json());

app.get('/', function (req,res) {
  res.sendFile('/public/index.html');
});


var user = {
  id: 101,
  name: 'oleg@gmail.com',
  password: '123',
  role: 'admin'
}

function authenticate(req,res,next){
  var body = req.body;
  if(!body.username || !body.password) {
    res.status(400).end('Please provide username or password');
  }
  if(body.username !== user.name || body.password !== user.password) {
    res.status(401).end('Username or password not match');
  }
  var token = jwt.sign({username: user.name }, jwtSecret, {
    expiresInMinutes: 1440
  });

  ls.set('access_key', token);

  next();
}

function authAdmin(req,res,next) {
  var token = ls.get('access_key');
  if(token) {
    jwt.verify(token, jwtSecret , function (err, decoded) {
      if(err) res.status(400).end('Who are you man ?');
      req.decoded = decoded;
      next();
    });
  } else {
    res.status(401).end('Sorry, Yo dont have permisions to come in');
  }
}


app.get('/admin/login', function (req,res) {
  res.render('login', {layout: 'login_layout'});
});

app.post('/admin/login', authenticate ,function (req,res) {
  res.redirect('/admin');
});

app.get('/admin', authAdmin, function (req,res) {
  res.render('admin', {page: page.home.title, user: req.decoded });
});





app.use(adminUserRoute);
app.use(adminBlogRoute);
app.use(adminGoodsRoute);
app.use(api);




app.listen(config.dev.prod, function () {
  console.log('We are on air,server listening on port ' + config.dev.port);
});
