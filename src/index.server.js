// importing package
const express = require('express');
const env = require("dotenv");                  // dotenv is used to include .env key and values
const mongoose = require('mongoose');          // for connecting to db & designing database schema 

// initializing express
const app = express();

// config Environment variables
env.config();

// importing routes 
const authRoutes = require('./routes/auth');                // importing auth routes
const adminRoutes = require('./routes/admin/auth');         // importing admin routes
const categoryRoutes = require('./routes/category');        // importing category routes
const productRoutes = require('./routes/product');          // importing product routes

// mongoDB connection
// mongodb+srv://root:<password>@cluster0.qad4m.mongodb.net/myFirstDatabase?retryWrites=true&w=majority // Mongo connection string
mongoose.connect(
    `mongodb+srv://${process.env.MONGO_DB_USER}:${process.env.MONGO_DB_PASSWORD}@cluster0.qad4m.mongodb.net/${process.env.MONGO_DB_DATABASE}?retryWrites=true&w=majority`,
    // {
    //     useNewUrlParser: true,
    //     useUnifiedTopology: true,
    //     userCreateIndex: true
    // }
).then(() => {
    console.log("Database Connected");
});

// adding a middleware for above included routes models
app.use(express.json());              
app.use('/api', authRoutes);                               
app.use('/api', adminRoutes);
app.use('/api', categoryRoutes);
app.use('/api', productRoutes);

app.listen(process.env.PORT, () => {
    console.log(`server is running on ${process.env.PORT}`);
});