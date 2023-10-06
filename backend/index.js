const express = require("express");
const db = require('./config/database.js');
const cors = require("cors");
const path = require("path");
const user = require('./routes/user.js');
const product = require("./routes/product.js");
const category = require("./routes/category.js");
const storage = require("./middleware/multer.js");
const basket = require("./routes/basket.js");
const order = require("./routes/order.js");
const message = require("./routes/message.js");
const {SocketServer} = require('./controllers/socketIO.js')
const app = express();
//Fonksiyonları kullanmaya başladık
app.use(cors());   //Güvenlik protokolü
app.use(express.json());   //Verileri jsona dönüştür
app.use("/uploads", express.static(path.join(__dirname, "uploads"))) //Resim dosyalarını göstermek için kullanılır.


app.use('/',user);
app.use('/',product);
app.use('/',category)
app.use('/',basket);
app.use('/',order);
app.use('/',message);





const Port = process.env.PORT || 5000;

const server=app.listen(Port,()=>{
              console.log("server is running")
})
const io = SocketServer(server);

db()