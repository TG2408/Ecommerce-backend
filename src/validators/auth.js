// validators check if the the incoming req object contains correct data according
// to our need, and then pass the data to controller

const { check, validationResult } = require('express-validator');

exports.validateSigninRequest = [
    check('email')
    .isEmail()
    .withMessage('Valid Email is required'),
    check('password')
    .isLength({ min: 6 })
    .withMessage('password must be atleast 6 character long')
];

exports.validateSignupRequest = [
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
];

exports.isRequestValidated = (req, res, next) => {
    const errors = validationResult(req);
    if(errors.array().length > 0) {
        return res.status(400).json({
            error: errors.array()[0].msg
        })
    };
    next();
};