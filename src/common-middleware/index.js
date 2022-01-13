const jwt = require('jsonwebtoken');

exports.requireSignin = (req, res, next) => {
    if (req.headers.authorization) {
        const token = req.headers.authorization.split(" ")[1];
        const user = jwt.verify(token, process.env.JWT_SECRET);
        req.user = user;        // we are attaching a new property to req object so that we can access user in next()
    }
    else{
        return res.status(400).json({
            message: "Authorization required"
        });
    }
    next();
};

exports.userMiddleware = (req, res, next) => {
    if (req.user.role !== "user") {
        return res.status(400).json({ meassage: "User access Denied" });
    };
    next();
};

exports.adminMiddleware = (req, res, next) => {
    if (req.user.role !== "admin") {
        return res.status(400).json({ meassage: "Admin access Denied" });
    };
    next();
};