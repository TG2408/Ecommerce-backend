const User = require('../models/user');
const jwt = require('jsonwebtoken');
const env = require('dotenv'); 

env.config();

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
            }

            if (data) {
                return res.status(201).json({
                    message: "user created successfully"
                });
            }
        })
    })
};

exports.signin = (req, res) => {
    User.findOne({email: req.body.email})
    .exec((error, user) => {
        if (error) return res.status(400).json({ error });
        if (user) {
            console.log(user);
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
    })
};