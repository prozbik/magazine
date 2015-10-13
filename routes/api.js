var express = require('express');
var router = express.Router();
var MD = require('../models/api');

router.get('/api/goods/:category?/:id?', MD.userAuth, MD.getGoods);
router.get('/api/blog/:id?', MD.userAuth, MD.getLastBlog, MD.getNewsById);

module.exports = router;
