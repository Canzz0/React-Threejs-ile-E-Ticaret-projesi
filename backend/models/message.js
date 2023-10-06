const mongoose = require('mongoose');

const messageSchema = new mongoose.Schema({
              _id: {
                            type: String,
                            required: true, //Gerekli olduğunu belirttik
              },
              receivedId: {
                            type: String,
                            required: true, //Gerekli olduğunu belirttik
              },
              senderId: {
                            type: String,
                            required: true, //Gerekli olduğunu belirttik
              },
              message: {
                            type: String,
                            required: true, //Gerekli olduğunu belirttik
              },
              date: Date,
              seen: {
                            type: String,
                            required: true, //Gerekli olduğunu belirttik
              },
})
module.exports = mongoose.model("Messages", messageSchema) 