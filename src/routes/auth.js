// import modules
const express = require('express');
const router = express.Router();

// self defined modules
const { signup, signin } = require('../controller/auth');
const { validateSignupRequest, isRequestValidated, validateSigninRequest } = require('../validators/auth');


router.post('/signin', validateSigninRequest, isRequestValidated, signin);
router.post('/signup', validateSignupRequest, isRequestValidated, signup);

// router.post('/profile', requireSignin,(req, res) => {
//      res.status(200).json({ user: req.user });
// });

module.exports = router;
