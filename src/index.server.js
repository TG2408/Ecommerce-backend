// modules
const express = require('express');
const env = require("dotenv");                  // dotenv is used to include .env key and values
const bodyParser = require('body-parser');      // for parsing incoming json data
const mongoose = require('mongoose');          // for designing database schema

// initializing express
const app = express();

// Environment variables
env.config();

// mongoDB connection
// mongodb+srv://root:<password>@cluster0.qad4m.mongodb.net/myFirstDatabase?retryWrites=true&w=majority
mongoose.connect(
    `mongodb+srv://${process.env.MONGO_DB_USER}:${process.env.MONGO_DB_PASSWORD}@cluster0.qad4m.mongodb.net/${process.env.MONGO_DB_DATABASE}?retryWrites=true&w=majority`
).then(() => {
    console.log("Database Connected");
});


app.use(bodyParser());

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