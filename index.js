var express = require('express');
var fs = require('fs');
var path = require('path');
var morgan = require('morgan');
var bodyParser = require('body-parser');
var multer = require('multer');
var mongoose = require('mongoose');
var expressLayouts = require('express-ejs-layouts');
/* models */

/* controllers */
var adminUserRoute = require('./routes/users');
var adminBlogRoute = require('./routes/articles');
var adminGoodsRoute = require('./routes/goods');
// /* API */
var api = require('./routes/api');
/* app */
var app = express();

/*set settings*/
app.set('view engine', 'ejs');
app.set("layout extractScripts", true);

app.use(morgan('dev'));
app.use(express.static(path.join(__dirname, 'app')));
app.use(expressLayouts);
app.use(bodyParser.urlencoded());


app.get('/', function (req,res) {
  res.sendFile('/public/index.html');
});

app.get('/admin', function (req,res) {
  var title = 'admin panel';
  var user = {
    name: 'Oleg Protsenko',
    role: 'admin'
  }
  res.render('admin', {title, user});
})

app.use(adminUserRoute);
app.use(adminBlogRoute);
app.use(adminGoodsRoute);
app.use(api);




app.listen(3000);
