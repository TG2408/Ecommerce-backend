// modules
const express = require('express');
const env = require("dotenv");

// initializing express
const app = express();

// Environment variables
env.config();

app.use(express.json());

app.get('/', (req, res, next) => {
    res.status(200).json({
        message: "Hello from server"
    })
})

app.post('/data', (req, res, next) => {
    res.status(200).json({
        message: req.body
    })
});

app.listen(process.env.PORT, () => {
    console.log(`server is running on ${process.env.PORT}`);
})