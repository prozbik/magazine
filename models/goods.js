var model = require('./data').Goods;
var page = require('../config/pages');
var ls = require('local-storage');
var jwt = require('jsonwebtoken');
var jwtSecret = 'fokeowkfow123KLfq/ekfoweo';

// TODO: input for desc, images, tags
// TODO: edit page for goods by id

module.exports = {
  adminAuth: function (req,res,next) {
    var token = ls.get('access_key');
    if(token) {
      jwt.verify(token, jwtSecret , function (err, decoded) {
        if(err) res.status(400).end('Who are you man ?');
        req.decoded = decoded;
        return next();
      });
    } else {
      res.status(401).end('Sorry, Yo dont have permisions to come in');
    }
  },
  getAction: function(req,res,next) {
    if(!req.params.action) req.params.action = 'list';
    if(req.params.action === 'delete') {
      var id = req.params.id;
      model.findByIdAndRemove({_id: id}, function (err) {
        if(err) throw new err;
        res.redirect('/admin/goods');
      });
    }
    if(req.params.action === 'edit') {
      var id = req.params.id;
      model.findOne({_id: id}, function (err,doc) {
        req.data = doc;
        req.title = 'Редактирование товара';
        return next();
      });
    }
    if(req.params.action === 'add') {
      req.title = 'Добавить товар';
      return next();
    }
    model.find({}, function (err,doc) {
      if(err) throw err;
      req.data = doc;
      req.title = 'Список товаров';
      return next();
    });
  },
  renderPage: function (req,res) {
    res.render('goods_' + req.params.action, {goods: req.data,
    page: page.goods.title + ' | ' + req.title, user: req.decoded });
  },
  postAction: function(req,res) {
    if(req.params.action === 'add'){
      var photos, buff = [], tags = [], tagsBuff;
      if(req.files) {
        photos = req.files;
        photos.forEach(function(photo){
          var destination, index;
          destination = photo.destination;
          index = destination.indexOf('/public');
          destination = destination.substring(index) + '/' + photo.filename;
          buff.push(destination);
          return buff;
        })
      }
      /* get tags like array */
      if(req.body.tags.length > 1){
        tagsBuff = req.body.tags.split(',');
        tagsBuff.forEach(function(i){
          tags.push(i.trim());
          return tags;
        });
      } else {
        return String(tags);
      }

      var product = new model({
        img:  buff[0],
        price: req.body.price,
        oldPrice: req.body.old_price || 0,
        sale: req.body.sale || false,
        name: req.body.name,
        category: req.body.category,
        color: req.body.color,
        available: req.body.available || false,
        quantity: req.body.quantity,
        desc: req.body.description,
        images: buff.slice(1),
        tags: tags
      });

      product.save(function (err) {
        if(err) throw err;
        res.redirect('/admin/goods');
      });
    }
    if(req.params.action === 'save') {
      var id, name, email;
      id = req.body.id; name = req.body.user_name; email = req.body.user_email;
      model.findOneAndUpdate({_id: id}, {name: name, email: email}, function (err) {
        if(err) throw new err;
        return res.redirect('/admin/goods/edit/' + id);
      });
    }
  }
};
