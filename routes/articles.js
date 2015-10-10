var express = require('express');
var router = express.Router();
var Blog = require('../models/data').Blog;

var redirect = function (req,res) {
  res.redirect('/admin/blog/list');
}


router
.get('/admin/blog', redirect)
.get('/admin/blog/list', function (req,res) {
  /* find all articles */
  Blog.find({}, function (err,doc) {
    if(err) throw new err;
    res.render('blog_list', {articles: doc});
  });
})
.get('/admin/blog/add', function (req,res) {
  res.render('blog_add');
})
.post('/admin/blog/add', function (req,res) {
  var article = new Blog ({
    title: req.body.title,
    date: req.body.date,
    status: req.body.status,
    text: req.body.text,
    tags: ['tag1', 'tag2', 'tag3'],
    img: 'http://placehold.it/750x332'
  });

  article.save(function (err) {
    if(err) throw new err;
    res.redirect('/admin/blog/list');
  });

})
.get('/admin/blog/delete/:id', function (req,res) {
  var id = req.params.id;
  Blog.findByIdAndRemove({_id: id}, function (err) {
    if(err) throw new err;
    res.redirect('/admin/blog/list');
  });
})
.get('/admin/blog/edit/:id', function (req,res) {
  var id = req.params.id;
  Blog.findOne({_id: id}, function (err, doc) {
    res.render('blog_edit', {article: doc});
  });
})


module.exports = router;
