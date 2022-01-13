const express = require('express');
const router = express.Router();

// importing category model
const Category = require('../models/category');

// importing category controller
const { addCategory } = require('../controller/category');

router.post('/category/create', addCategory);

module.exports = router;