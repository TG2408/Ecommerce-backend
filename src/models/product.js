const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    
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
    price: {
        type: Number,
        required: true
    },
    description: {
        type: String,
        required: true,
        trim: true
    },
    offers: {
        type: Number
    },
    productPictures: [
        { img: { type: String } }
    ],
    reviews: [
        {
            userId: mongoose.Schema.Types.ObjectId, ref: "User",
            reviews: String
        }
    ],
    category: { type: mongoose.Schema.Types.ObjectId, ref="Category" } ,
    createdBy: { type: mongoose.Schema.Types.ObjectId, ref='User' },
    updatedAt: Date

}, { timestamps: true });

module.exports = mongoose.model('Product', productSchema);
