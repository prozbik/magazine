var express = require('express');
var router = express.Router();
var model = require('../models/data').Users;


var MD = {
  adminAuth: function (req,res,next) {
    console.log('hello admin');
    return next();
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
        req.data = doc;
        return next();
      });
    }
    model.find({}, function (err,doc) {
      if(err) throw err;
      req.data = doc;
      return next();
    });
  },
  renderPage: function (req,res) {
    res.render('users_' + req.params.action, {users: req.data });
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


router.get('/admin/users/:action?/:id?', MD.adminAuth, MD.getAction, MD.renderPage);
router.post('/admin/users/:action?/:id?', MD.adminAuth, MD.postAction);


module.exports = router;
