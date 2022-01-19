const express = require('express');

// import commonn middleware module
const { requireSignin, adminMiddleware } = require('../common-middleware/index');

// importing product model
const Product = require('../models/product');

// initializing express router
const router = express.Router();

router.post('/product/create', requireSignin, adminMiddleware, (req, res) => {

    res.status(200).json({ message: "product working" });

});

module.exports = router;