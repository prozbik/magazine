var express = require('express');
var router = express.Router();
var MD = require('../models/articles');
var multer = require('multer');
var storage = multer.diskStorage({
  destination: function (req,file,callback) {
    callback(null, process.cwd() + '/app/public/img/articles');
  }
});
var upload = multer({ storage: storage });

router.get('/admin/blog/:action?/:id?', MD.adminAuth, MD.getAction, MD.renderPage);
router.post('/admin/blog/:action?/:id?', MD.adminAuth,upload.single('blog_photo'), MD.postAction);


module.exports = router;
