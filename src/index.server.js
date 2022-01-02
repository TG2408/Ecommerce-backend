// modules
const express = require('express');
const env = require("dotenv");

// initializing express
const app = express();

// Environment variables
env.config();

app.listen(process.env.PORT, () => {
    console.log(`server is running on ${process.env.PORT}`);
})