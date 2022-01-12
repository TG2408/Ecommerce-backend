const express = require('express');
const { signup, signin } = require('../controller/auth');
const { check } = require('express-validator');
const router = express.Router();


router.post('/signin', signin);
router.post('/signup', [
    check('firstname')
    .notEmpty()
    .withMessage('firstname is required'),
    check('lastname')
    .notEmpty()
    .withMessage('lastname is required'),
    check('email')
    .isEmail()
    .withMessage('Valid Email is required'),
    check('password')
    .isLength({ min: 6 })
    .withMessage('password must be atleast 6 character long')
], signup);

// router.post('/profile', requireSignin,(req, res) => {
//      res.status(200).json({ user: req.user });
// });

module.exports = router;
