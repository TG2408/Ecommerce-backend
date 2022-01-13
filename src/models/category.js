const mongoose = require('mongoose');

const categorySchema = new mongoose.Schema({
    
    name: {
        type: String,
        required: true,
        trim: true
    },
    // slug is used so that category name is not added 2 times
    slug: {
        type: String,
        required: true,
        unique: true
    },
    parentId: {
        type: String
    }

}, { timestamps: true });

module.exports = mongoose.model('category', categorySchema);