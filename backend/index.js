/// Kullanıcağımız kütüphaneleri tanımladık
const mongoose = require('mongoose');
const express = require("express");
const app = express();
const { v4: uuidv4 } = require("uuid");
const multer = require("multer");
const cors = require("cors");
const jwt = require("jsonwebtoken");
const path = require("path");
//Fonksiyonları kullanmaya başladık
app.use(cors());   //Güvenlik protokolü
app.use(express.json());   //Verileri jsona dönüştür
app.use("/uploads", express.static(path.join(__dirname, "uploads"))) //Resim dosyalarını göstermek için kullanılır.
const url = "mongodb+srv://MongoDB:1@reacteticaret.ufz2qsp.mongodb.net/?retryWrites=true&w=majority" //MONGODAN ALDIĞIMIZ URL
mongoose.connect(url).then(res => {
    console.log("database başarılı"); //Bağlantı başarılı ise gösterilecek mesaj
}).catch(err => {
    console.log(err.message)
});
const port = 5000;
app.listen(5000, () => {
    console.log("Uygulama http://localhost:" + port + " üzerinde ayakta") //Uygulamanın adresini yazdırır
});

//user için Collections oluşturduk
const userSchema = new mongoose.Schema({
    _id: String,
    name: String,
    email: String,
    password: String,
    isAdmin: Boolean,
    role: String,
})

const User = mongoose.model("User", userSchema) //Bilgileri mongoose model yardımı ile kullanılabilir hale getirdik

const categorySchema = new mongoose.Schema({
    _id: String,
    name: String,
})
const Category = mongoose.model("Category", categorySchema)

const productSchema = new mongoose.Schema({
    _id: String,
    name: String,
    description: String,
    sellerid: String,
    stock: Number,
    price: Number,
    imageUrl: String,
    figurUrl: String,
    categoryName: String,
})
const Product = mongoose.model("Product", productSchema)

const basketSchema = new mongoose.Schema({
    _id: String,
    productId: String,
    userId: String,
    sellerId: String,

})
const Basket = mongoose.model("Basket", basketSchema)

const orderSchema = new mongoose.Schema({
    _id: String,
    productId: String,
    userId: String,
    sellerId: String,
})
const Order = mongoose.model("Order", orderSchema)

//TOKEN
const secretKey = "Gizli Anahtar";
const options = {
    expiresIn: "1h"
}

//MESAJLAŞMA İÇİN 
//user için Collections oluşturduk
const messageSchema = new mongoose.Schema({
    _id: String,
    sender: String,
    sent: String,
    message: String,
})
const Messages = mongoose.model("Messages", messageSchema) //Bilgileri mongoose model yardımı ile kullanılabilir hale getirdik


const bcrypt = require('bcrypt');

//Register İşlemi
app.post("/auth/register", async (req, res) => {
    try {
        const { name, email, password, role } = req.body;  //req body üzerinden verileri alır
        //ŞİFRE hashleme için kullanıcaz
        const saltRounds = 10;
        const hashedPassword = await bcrypt.hash(password, saltRounds);
        let user = new User({
            _id: uuidv4(),
            name: name,
            email: email,
            password: hashedPassword,
            isAdmin: false,
            role: role
        });
        await user.save();
        const payload = {
            user: user,
            role: role,
        }
        const token = jwt.sign(payload, secretKey, options)
        res.json({ user: user, token: token })
    } catch (error) {
        res.status(500).json({ error: error.message })
    }
})

// LOGIN İşlemi
app.post("/auth/login", async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email: email });

        if (!user) {
            res.status(500).json({ message: "Mail adresi veya şifre yanlış" });
        } else {
            // Bcrypt ile şifreyi karşılaştırma,çözümleme
            const passwordMatch = await bcrypt.compare(password, user.password);

            if (passwordMatch) {
                const payload = {
                    user: user
                };
                const token = jwt.sign(payload, secretKey, options);
                res.json({ user: user, token: token });

            } else {
                res.status(500).json({ message: "Mail adresi veya şifre yanlış" });
            }
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});
///PRODUCT işlemleri

//GET  getirme işlemleri
app.get("/products", async (req, res) => {
    try {
        const products = await Product.find({}).sort({ name: 1 });
        res.json(products);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
})

///////////////////////////////////////


// Dosya Kayıt İşlemi
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, "uploads");
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + "-" + file.originalname);
    },
});

const upload = multer({ storage: storage });
////////////////////

// Add Product İşlemi
app.post(
    "/products/add",
    upload.fields([
        { name: "image", maxCount: 1 },
        { name: "figur", maxCount: 1 },
    ]),
    async (req, res) => {
        try {
            const { name, description, sellerid, categoryName, stock, price } = req.body;
            const product = new Product({
                _id: uuidv4(),
                name: name,
                description: description,
                stock: stock,
                price: price,
                sellerid: sellerid,
                categoryName: categoryName,
                imageUrl: req.files["image"][0].path,
                figurUrl: req.files["figur"][0].path,
            });
            await product.save();
            res.json({ message: "Ürün Kaydı Başarıyla Tamamlandı" });
        } catch (error) {
            console.log(error);
            res.status(500).json({ message: error.message });
        }
    }
);
////////////////////////////////////7

//Product Sİlme İşlemi 
app.post("/products/remove", async (req, res) => {
    try {
        const { _id } = req.body;
        await Product.findByIdAndRemove(_id);
        res.json({ message: "Ürün Silme İşlemi Başarıyla Tamamlandı" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});
////////// 

//CATEGORY İŞLEMLERİ

//Cateogry GET getirme işlemleri
app.get("/categories", async (req, res) => {
    try {
        const categories = await Category.find({}).sort({ name: 1 });
        res.json(categories);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
})

///////////////////////////////////////

// Add Category İşlemi
app.post(
    "/categories/add", async (req, res) => {
        try {
            const { name } = req.body;
            const category = new Category({
                _id: uuidv4(),
                name: name,
            });

            await category.save();

            res.json({ message: "Kategori Kaydı Başarıyla Tamamlandı" });
        } catch (error) {
            console.log(error);
            res.status(500).json({ message: error.message });
        }
    }
);
////////////////////////////////////7

//Category Sİlme İşlemi 
app.post("/categories/remove", async (req, res) => {
    try {
        const { _id } = req.body;
        await Category.findByIdAndRemove(_id);
        res.json({ message: "Category Silme İşlemi Başarıyla Tamamlandı" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

/////////////////////////


// BASKET İŞLEMLERİ
///////AddBasket İşlemi
app.post("/baskets/add", async (req, res) => {
    try {
        const { productId, sellerId, userId } = req.body;//Burada userId ile productıd'yi aldık
        let basket = new Basket({
            _id: uuidv4(),
            productId: productId,
            userId: userId,
            sellerId: sellerId,
        });
        await basket.save()
        res.json({ message: "Ürün Sepete Eklendi" })
        let product = await Product.findById(productId);
        product.stock = product.stock - 1; //ürün sepete eklendiğinde veritabanından 1 tane düşeceğiz
        await Product.findByIdAndUpdate(productId, product); //Güncelliyoruz
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});


///////

//////GetBasket İşlemi
//Biz burada userId ile eşitlenen değerleri alıyoruz ve product tablosunda o değerlerin verilerini çekmeye yardımcı oluyoruz.
app.post("/baskets/getAll", async (req, res) => {
    try {
        const { userId } = req.body //UserID'yi basket.jsx içinden alıyoruz method'dan
        const baskets = await Basket.aggregate([
            {
                $match: { userId: userId } //Burada değerleri eşledik
            },
            {
                $lookup: {  //MongoDB özelliği
                    from: "products",  //İlişkili tablo adı
                    localField: "productId",//Basket'de kullanılan alanın ismi
                    foreignField: "_id", //İlişkisel olarak product tablosunda localfield'in eşiti (primary/foreign key gibi)
                    as: "products" //Yeni alan
                }
            }
        ]);
        res.json(baskets);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
})
//////////////

//RemoveBasket İşlemi///
app.post("/baskets/remove", async (req, res) => {
    try {
        const { _id } = req.body;
        await Basket.findByIdAndRemove(_id);
        res.json({ message: "Ürün Silme İşlemi Başarıyla Tamamlandı" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});


//SİPARİŞ İŞLEMLERİ

//Sipariş Ürün Ekleme

app.post("/orders/add", async (req, res) => {
    try {
        const { userId } = req.body;  //UserID aldık
        const baskets = await Basket.find({ userId: userId }); //Sepet tablosunda eşleşen verileri aldık
        for (const basket of baskets) { //for ile basket diye const oluşturduk
            let order = new Order({ //Yeni sipariş verisi oluşturduk
                _id: uuidv4(), //Eşsiz bir ID
                productId: basket.productId, //Sepetteki ürünün ID'sini aldık
                sellerId: basket.sellerId,
                userId: userId, //Kullanıcı ID'sini aldık ve kayıt ettik
            });
            order.save(); //Order tablosuna kayıt ettik verileri
            await Basket.findByIdAndDelete(basket._id)//Sepetten kayıt edilen ürünü sildik 
        }//Yukarıda ürün sayısı kadar döngü dönüyor sonrasında bitiyor

    } catch (error) {
        res.status(500).json({ message: error.message })

    }
})
app.post("/orders/getAll", async (req, res) => {
    try {
        const { userId } = req.body //UserID'yi Order.jsx içinden alıyoruz method'dan
        const baskets = await Order.aggregate([
            {
                $match: { userId: userId } //Burada değerleri eşledik
            },
            {
                $lookup: {  //MongoDB özelliği
                    from: "products",  //İlişkili tablo adı
                    localField: "productId",//Basket'de kullanılan alanın ismi
                    foreignField: "_id", //İlişkisel olarak product tablosunda localfield'in eşiti (primary/foreign key gibi)
                    as: "products" //Yeni alan
                }
            }
        ]);
        res.json(baskets);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
})

//Siparişleri Getirme
app.get("/orders", async (req, res) => {
    try {
        const orders = await Order.aggregate([
            {
                $lookup: {
                    from: "products", // ilişkili tablo
                    localField: "productId", // orderda karşılığı
                    foreignField: "_id", // products'da karşılığı
                    as: "productInfo" // saklanacak alan bunun üzerinden çağırıcaz
                }
            },
            {
                $lookup: {
                    from: "users", // ilişkili tablo
                    localField: "sellerId", // orderda karşılığı
                    foreignField: "_id", // users'da karşılığı
                    as: "userInfo" // saklanacak alan bunun üzerinden çağırıcaz
                }
            },
        ]);

        res.json(orders);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

