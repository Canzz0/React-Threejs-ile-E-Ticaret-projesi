const mongoose = require('mongoose');



const basketSchema = new mongoose.Schema({
    _id: {
        type: String,
        required: true, //Gerekli olduğunu belirttik
        trim: true
    },
    productId: {
        type: String,
        required: true, //Gerekli olduğunu belirttik

    },
    userId: {
        type: String,
        required: true, //Gerekli olduğunu belirttik
        trim: true
    },
    sellerId: {
        type: String,
        required: true, //Gerekli olduğunu belirttik
        trim: true
    },

})
module.exports = mongoose.model('Basket', basketSchema);