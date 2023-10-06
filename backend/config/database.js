const mongoose = require('mongoose');

const url = "mongodb+srv://MongoDB:1@reacteticaret.ufz2qsp.mongodb.net/?retryWrites=true&w=majority" //MONGODAN ALDIĞIMIZ URL

const db = () => {
              mongoose.connect(url, {
                            useNewUrlParser: true,
                            useUnifiedTopology: true
              }).then(() => {
                            console.log('mongoDB connect');

              }).catch((err) => {
                            //throw new Error(err.message);
                            console.log(err);
              })

}

module.exports = db;