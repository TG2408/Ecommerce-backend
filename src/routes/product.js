const express = require('express');
const multer = require('multer');
const upload = multer({ dest: 'uploads/'})

// initializing express router
const router = express.Router();


// import middleware module
const { requireSignin, adminMiddleware } = require('../common-middleware/index');
const { createProduct } = require('../controller/product');

router.post('/product/create', requireSignin, adminMiddleware, upload.single('productPicture') , createProduct);

module.exports = router;