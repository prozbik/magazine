var mongoose = require('mongoose');
var config = require('../config/app');

mongoose.connect(config.dev.db);

var db = mongoose.connection;

db.on('error', console.error.bind(console, 'connection error:'));

db.once('open', function (callback) {
  console.log('db connected...');
});

var GoodsSchema = new mongoose.Schema({
  img: String,
  price: Number,
  oldPrice: {type: Number, default: 0},
  sale: {type: Boolean, default: false},
  name: String,
  category: String,
  color: [],
  available: {type: Boolean, default: false},
  quantity: {type: Number, default: 1}
});


var BlogSchema = new mongoose.Schema({
  img: String,
  status: {type: Boolean, default: false},
  date: { type: Date, default: Date.now },
  tags: [],
  title: String,
  text: String
});


var UserSchema = new mongoose.Schema({
  name: String,
  password: String,
  email: String,
  role: {type: String, default: 'user'}
});



module.exports.Goods = mongoose.model('Goods', GoodsSchema);

module.exports.Blog = mongoose.model('Blog', BlogSchema);

module.exports.Users = mongoose.model('User', UserSchema );
