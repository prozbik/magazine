var express = require('express');
var fs = require('fs');
var path = require('path');
var morgan = require('morgan');
var mongoose = require('mongoose');
var expressLayouts = require('express-ejs-layouts');
var Goods = require('./models/goods.js').Goods;

var app = express();

app.set('view engine', 'ejs');


app.use(morgan('dev'));
app.use(express.static(path.join(__dirname, 'app')));
app.use(expressLayouts);

app.get('/', function (req,res) {
  res.sendFile('/public/index.html');
});

/* admin section */
app.get('/admin', function (req,res) {
  var title = 'admin panel';
  var user = {
    name: 'Oleg Protsenko',
    role: 'admin'
  }
  res.render('admin', {title, user});
});

/* goods */
app.get('/admin/goods/list', function (req,res) {
  Goods.find({}, function (err,data) {
    if(err) throw new err;
    res.render('goods_list'); //render data to template
  })
});

app.get('/admin/goods/add', function (req,res) {
  res.render('goods_add');
});

/* users */
app.get('/admin/users/add', function (req,res) {
  res.render('users_add');
});

app.get('/admin/users/list', function (req,res) {
  /* find all users*/
  res.render('users_list'); //render data to template
});

/* blog */
app.get('/admin/blog/add', function (req,res) {
  res.render('blog_add'); //render data to template
});

app.get('/admin/blog/list', function (req,res) {
  /* find all articles */
    res.render('blog_list'); //render data to template
});






/* API */
app.get('/api/goods', function (req,res) {
    Goods.find({}, function (err, data) {
      if(err) throw new err;
      res.json(data);
    })
});

/*find all by category */
app.get('/api/goods/:category', function (req,res) {
  var category = req.params.category;

    Goods.find({category: category }, function (err, data) {
      if(err) throw new err;
      res.json(data);
    })
});


app.listen(3000);
