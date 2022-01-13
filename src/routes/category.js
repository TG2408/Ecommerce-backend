const express = require('express');
const router = express.Router();

// importing category model
const Category = require('../models/category');

// importing category controller
const { addCategory, getCategory } = require('../controller/category');
const { requireSignin, adminMiddleware } = require('../common-middleware');

router.post('/category/create', requireSignin, adminMiddleware, addCategory);
router.get('/category/getCategory', getCategory);

module.exports = router;