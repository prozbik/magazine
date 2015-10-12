var express = require('express');
var router = express.Router();
var MD = require('../models/api');

router.get('/api/v.0.0.1/:cat?/:id?', MD.userAuth, MD.getGoods);

module.exports = router;
