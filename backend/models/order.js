const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
              _id: {
                            type: String,
                            required: true, //Gerekli olduğunu belirttik
              },
              productId: {
                            type: String,
                            required: true, //Gerekli olduğunu belirttik
              },
              userId: {
                            type: String,
                            required: true, //Gerekli olduğunu belirttik
              },
              sellerId: {
                            type: String,
                            required: true, //Gerekli olduğunu belirttik
              },
})
module.exports = mongoose.model("Order", orderSchema)