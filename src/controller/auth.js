const User = require('../models/user');     // importing user module
const jwt = require('jsonwebtoken');        // generates token for each user auth in further api request 
const env = require('dotenv');              // npm package for .env file

env.config();           // configuring .env variables

// controler function for signup or create new user
exports.signup = (req, res) => {

    User.findOne({ email: req.body.email })
    .exec((error, user) => {
        if (user) return res.status(400).json({
            message: "user already exist"
        });

        const {
            firstname,
            lastname,
            email,
            password
        } = req.body;

        const _user = new User({ 
            firstname, 
            lastname, 
            email, 
            password,
            username: Math.random().toString() 
        });

        _user.save((error, data) => {
            if (error) {
                return res.status(400).json({
                    message: "Something went wrong"
                });
            };

            if (data) {
                return res.status(201).json({
                    message: "user created successfully"
                });
            };
        });
    });
};

// controller function that takes user email and password and return token on successfull user auth 
exports.signin = (req, res) => {
    User.findOne({email: req.body.email})
    .exec((error, user) => {
        if (error) return res.status(400).json({ error });
        if (user) {
            if(user.authenticate(req.body.password)) {
                const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET, { expiresIn: "1h" });
                const { _id, fistname, lastname, email, role, fullName } = user;
                res.status(200).json({
                    token,
                    user: { _id, fistname, lastname, email, role, fullName }
                });
            } else {
                return res.status(400).json({
                    message: "Invalid password"
                });
            }
        } else {
            return res.status(400).json({ message: "Something went wrong" });
        }
    });
};

//
exports.requireSignin = (req, res, next) => {
    const token = req.headers.authorization.split(" ")[1];
    const user = jwt.verify(token, process.env.JWT_SECRET);
    req.user = user;        // we are attaching a new property to req object so that we can access user in next()
    next();
}