const mongoose = require('mongoose');


//user için Collections oluşturduk
const userSchema = new mongoose.Schema({
              _id: String,
              name: {
                            type: String,
                            required: true, //Gerekli olduğunu belirttik
                            trim: true
              },
              email: {
                            type: String,
                            required: true,
                            unique: true // 1 email ile tek bir hesap eşleşebilir
              },
              password: {
                            type: String,
                            required: true
              },
              isAdmin: {
                            type: Boolean,
              },

              role: {
                            type: String,
                            required: true
              }
})

module.exports =mongoose.model('User',userSchema);