var mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/test');

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
  product: [], //mixed {color,quantity,images}
  available: {type: Boolean, default: false}
});


module.exports.Goods = mongoose.model('Goods', GoodsSchema);
