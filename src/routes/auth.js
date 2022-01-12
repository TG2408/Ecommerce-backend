// import modules
const express = require('express');
const router = express.Router();

// self defined modules
const { signup, signin } = require('../controller/auth');
const { validateRequest, isRequestValidated } = require('../validators/auth');


router.post('/signin', signin);
router.post('/signup', validateRequest, isRequestValidated, signup);

// router.post('/profile', requireSignin,(req, res) => {
//      res.status(200).json({ user: req.user });
// });

module.exports = router;
