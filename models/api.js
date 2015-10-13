var model = require('./data').Goods;
var modelBlog = require('./data').Blog;
var categories = ['gloves', 'wallet', 'citybag', 'belts', 'backpack'];

module.exports =  {
  userAuth: function (req,res,next) {
    console.log('hello user');
    return next();
  },
  getGoods: function(req,res,next){
    /*if no params then get all*/
    if(!req.params.category && !req.params.id) {
      req.params.category = 'all';
      model.find({}, function (err,doc) {
        if(err) throw err;
        res.json(doc);
      });
    }
    /* if params match cat that exist*/
    if(req.params.category && !req.params.id) {
      categories.forEach(function (item) {
        if(item === req.params.categoryegory) {
          model.find({category: req.params.category}, function (err,doc) {
            if(err) throw err;
            res.json(doc);
          })
        }
      })
    }
    /* get item by cat and id*/
    if(req.params.category && req.params.id) {
      model.findOne({category: req.params.category, _id: req.params.id},
      function (err,doc) {
        if(err) throw err;
        res.json(doc);
      })
    }
  },
  getLastBlog: function (req,res,next) {
  if(!req.params.id) {
    modelBlog.find({},{},{sort: { 'date': 1}},
    function (err,doc) {
      if(err) throw err;
      res.json(doc);
    }).limit(4);
  } else {
      return next();
    }
  },
  getNewsById: function(req,res) {
    modelBlog.findOne({_id: req.params.id}, function (err,doc) {
      if(err) throw err;
      res.json(doc);
    })
  }
}
