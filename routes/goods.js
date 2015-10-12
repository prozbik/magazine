var express = require('express');
var router = express.Router();
var multer = require('multer');
var storage = multer.diskStorage({
  destination: function (req,file,callback) {
    callback(null, process.cwd() + '/app/public/uploads/' + req.body.category);
  }
});
var upload = multer({ storage: storage });
var MD = require('../models/goods');

router.get('/admin/goods/:action?/:id?', MD.adminAuth, MD.getAction, MD.renderPage);
router.post('/admin/goods/:action?/:id?', MD.adminAuth, upload.single('picture'), MD.postAction);


module.exports = router;
