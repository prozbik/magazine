var express = require('express');
var router = express.Router();
var multer = require('multer');
var Goods = require('../models/data').Goods;
var path = require('path');
var root = path.join(__dirname, 'public');
var upload = multer({ dest: root + '/uploads/' });


router.get('/admin/goods', function (req,res) {
  /*get list of products */
  Goods.find({}, function (err,doc) {
    if(err) throw err;
    res.render('goods_list', {goods: doc});
  });
})
.get('/admin/goods/add', function (req,res) {
  res.render('goods_add');
})
.post('/admin/goods', upload.single('picture'), function (req,res) {
  /* add product */
  var img;
  if(req.file) {
    img = req.file.path + req.file.originalname;
  } else {
    img = 'http://placehold.it/500x300';
  }
  var product = new Goods({
    img:  img,
    price: req.body.price,
    oldPrice: req.body.old_price || 0,
    sale: req.body.sale || false,
    name: req.body.name,
    category: req.body.category,
    color: req.body.color,
    available: req.body.available || false,
    quantity: req.body.quantity
  });

  product.save(function (err) {
    if(err) throw err;
    res.redirect('/admin/goods');
  });
})
.get('/admin/goods/edit/:id', function (req,res) {
  /* find and update product by id*/
  var id = req.params.id;
  Goods.findOne({_id: id}, function (err, doc) {
    res.render('goods_edit', { product: doc });
  });
})
.get('/admin/goods/delete/:id', function (req,res) {
  /* delete product by id*/
  var id = req.params.id;
  Goods.findByIdAndRemove({_id: id}, function (err) {
    if(err) throw new err;
    res.redirect('/admin/goods');
  });
});

module.exports = router;
