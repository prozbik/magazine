var express = require('express');
var router = express.Router();
var MD = require('../models/users');


router.get('/admin/users/:action?/:id?', MD.adminAuth, MD.getAction, MD.renderPage);
router.post('/admin/users/:action?/:id?', MD.adminAuth, MD.postAction);


module.exports = router;
