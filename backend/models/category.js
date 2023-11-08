const mongoose = require('mongoose');

const categorySchema = new mongoose.Schema({
    _id: {
        type: String,
        required: true, //Gerekli olduğunu belirttik
    },
    name: {
        type: String,
        required: true, //Gerekli olduğunu belirttik
    },
})
module.exports = mongoose.model("Category", categorySchema)