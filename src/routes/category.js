const express = require('express');
const router = express.Router();

// importing category model
const Category = require('../models/category');

// importing category controller
const { addCategory, getCategory } = require('../controller/category');

router.post('/category/create', addCategory);
router.get('/category/getCategory', getCategory);

module.exports = router;