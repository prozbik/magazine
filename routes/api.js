var express = require('express');
var router = express.Router();
var Goods = require('../models/data').Goods;
var categories = ['gloves', 'wallet', 'citybag', 'belts', 'backpack'];

router.get('/api/v.0.1/:cat?', function (req,res) {
  var category = req.params.cat;
  if(category) {
    categories.forEach(function (item) {
      if(item === category) {
        Goods.find({category: category}, function (err,doc) {
          if(err) throw err;
          res.json(doc);
        });
      }
    })
  } else {
    res.end('Hey do');
  }
})

module.exports = router;
