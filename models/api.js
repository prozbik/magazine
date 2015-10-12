var model = require('./data').Goods;
var categories = ['gloves', 'wallet', 'citybag', 'belts', 'backpack'];

module.exports =  {
  userAuth: function (req,res,next) {
    console.log('hello user');
    return next();
  },
  getGoods: function(req,res,next){
    /*if no params then get all*/
    if(!req.params.cat && !req.params.id) {
      req.params.cat = 'all';
      model.find({}, function (err,doc) {
        if(err) throw err;
        res.json(doc);
      });
    }
    /* if params match cat that exist*/
    if(req.params.cat && !req.params.id) {
      categories.forEach(function (item) {
        if(item === req.params.cat) {
          model.find({category: req.params.cat}, function (err,doc) {
            if(err) throw err;
            res.json(doc);
          })
        }
      })
    }
    /* get item by cat and id*/
    if(req.params.cat && req.params.id) {
      model.findOne({category: req.params.cat, _id: req.params.id},
      function (err,doc) {
        if(err) throw err;
        res.json(doc);
      })
    }
  }
}
