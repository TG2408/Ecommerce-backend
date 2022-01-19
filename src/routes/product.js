const express = require('express');
const multer = require('multer');
const shortid = require('shortid');
const path = require('path');

// initializing express router
const router = express.Router();

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, '../uploads/')
    },
    filename: function (req, file, cb) {
      const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
      cb(null, shortid.generate() + '-' + file.originalname)
    }
  })

const upload = multer({ storage });

// import middleware module
const { requireSignin, adminMiddleware } = require('../common-middleware/index');
const { createProduct } = require('../controller/product');

router.post('/product/create', requireSignin, adminMiddleware, upload.single('productPicture') , createProduct);

module.exports = router;