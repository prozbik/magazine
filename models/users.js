var model = require('./data').Users;
var page = require('../config/pages');
var ls = require('local-storage');
var jwt = require('jsonwebtoken');
var jwtSecret = 'fokeowkfow123KLfq/ekfoweo';

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
        return res.redirect('/admin/users')
      });
    }
    if(req.params.action === 'edit') {
      var id = req.params.id;
      model.findOne({_id: id}, function (err,doc) {
        req.title = 'Редактирование пользователя';
        req.data = doc;
        return next();
      });
    }
    if(req.params.action === 'add' ) {
      req.title = 'Добавить пользователя';
      return next();
    }
    model.find({}, function (err,doc) {
      if(err) throw err;
      req.data = doc;
      req.title = 'Список пользователей';
      return next();
    });
  },
  renderPage: function (req,res) {
    res.render('users_' + req.params.action, {users: req.data,
    page: page.users.title + ' | ' + req.title, user: req.decoded });
  },
  postAction: function(req,res) {
    if(req.params.action === 'add'){
      var user = new model ({
        name: req.body.user_name,
        password: req.body.user_password,
        email: req.body.user_email
      });
      user.save(function (err) {
        if(err) throw new err;
        return res.redirect('/admin/users/list');
      });
    }
    if(req.params.action === 'save') {
      var id, name, email;
      id = req.body.id; name = req.body.user_name; email = req.body.user_email;
      model.findOneAndUpdate({_id: id}, {name: name, email: email}, function (err) {
        if(err) throw new err;
        return res.redirect('/admin/users/edit/' + id);
      });
    }
  }
};
