var express = require('express');
var router = express.Router();
var MD = require('../models/articles');


router.get('/admin/blog/:action?/:id?', MD.adminAuth, MD.getAction, MD.renderPage);
router.post('/admin/blog/:action?/:id?', MD.adminAuth, MD.postAction);


module.exports = router;
