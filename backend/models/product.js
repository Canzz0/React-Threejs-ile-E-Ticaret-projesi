const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    _id: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    sellerid: {
        type: String,
        required: true
    },
    stock: {
        type: Number,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    imageUrl: {
        type: String,
        required: true
    },
    figurUrl: {
        type: String,
        default: null
    },
    categoryName: {
        type: String,
        required: true
    },
})
module.exports = mongoose.model('Product', productSchema);