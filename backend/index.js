/// Kullanıcağımız kütüphaneleri tanımladık
const mongoose = require('mongoose');
const express =require("express");
const app =express();
const {v4:uuidv4} =require("uuid");
const multer = require("multer");
const cors = require("cors");
const jwt = require("jsonwebtoken");
const path =require("path");
//Fonksiyonları kullanmaya başladık
app.use(cors());   //Güvenlik protokolü
app.use(express.json());   //Verileri jsona dönüştür
app.use("/uploads",express.static(path.join(__dirname,"upload"))) //Resim dosyalarını göstermek için kullanılır.
const url = "mongodb+srv://MongoDB:1@reacteticaret.ufz2qsp.mongodb.net/?retryWrites=true&w=majority" //MONGODAN ALDIĞIMIZ URL
mongoose.connect(url).then(res =>{
    console.log("database başarılı"); //Bağlantı başarılı ise gösterilecek mesaj
}).catch(err =>{
    console.log(err.message)
});

//user için Collections oluşturduk
const userSchema = new mongoose.Schema({
    _id:String,
    name:String,
    email:String,
    password:String,
    isAdmin:Boolean,
})

const User = mongoose.model("User",userSchema) //Bilgileri mongoose model yardımı ile kullanılabilir hale getirdik

const productSchema = new mongoose.Schema({
    _id:String,
    name:String,
    stock:Number,
    price:Number,
    imageUrl:String,
    categoryName:String,
})
const Product = mongoose.model("Product",productSchema)

const basketSchema = new mongoose.Schema({
    _id:String,
    productId:String,
    userId:String,

})
const Basket = mongoose.model("Basket",basketSchema)

const orderSchema = mongoose.Schema({
    _id:String,
    productId:String,
    userId:String,
})
const Order = mongoose.model("Order",orderSchema)

//TOKEN
const secretKey ="Gizli Anahtar";
const options ={
    expiresIn:"1h"
}

//TOKEN FİNİSH

//Register İşlemi
app.post("/auth/register",async(req,res)=>{
    try {
        const {name,email,password}=req.body;  //req body üzerinden verileri alır
        let user = new User({
            _id :uuidv4(),  //Benzersiz bir id ataması yapar
            name:name,
            email:email,
            password:password,
            isAdmin:false
        });
        await user.save();  //kullanıcıyı kaydeder ve kaydedesiye kadar bekler
        const payload ={     //Burada payload adlı değişken oluşturup içine kullanıcı bilgilerini ekler
            user:user
        }
        const token =jwt.sign(payload,secretKey,options)  //Bu da kullanıcı bilgilerini doğrulamak için oluşturduğumuz jwt nesneyi giriş için kullanılıcak
        res.json({user:user,token:token})  // Bu kod, bir HTTP yanıtı döndürür ve yanıtın Content-Type özelliğini application/json olarak ayarlar.
    }catch (error){ //Hata mesajını 500 üzerinden göstermeye yarar
            res.status(500).json({error:error.message})
    }
})
///LOGİN İŞLEMi
app.post("/auth/login",async(req,res)=>{
    try {
        const {email,password} = req.body;
        const users = await User.find({email:email,password:password}); //Burada doğrulama işlemi kullanıcı bulma işlemi yapılıyor
        if (users.length==0){
            res.status(500).json({message:"Mail adresi veya şifre yanlış"});  //Eğer kullanıcı bulunamazsa
        }else {
            const payload ={
                user:users[0]  //ilk çıkan sonucu al demek için
            }
            const token = jwt.sign(payload,secretKey,options);
            res.json({user:users[0],token:token})
        }
    } catch(error){

    }
})
///PRODUCT işlemleri

//GET  getirme işlemleri
app.get("/products",async(req,res)=>{
    try{
        const products =await Product.find({}).sort({name:1});
        res.json(products);
    } catch(error){
        res.status(500).json({message:error.message});
    }
})
const port =5000;
app.listen(5000,()=>{
    console.log("Uygulama http://localhost:" + port + " üzerinde ayakta") //Uygulamanın adresini yazdırır
});
//GET  getirme işlemleri


//Dosya Kayıt İşlemi
const storage =multer.diskStorage({
    destination:function(req,file,cb){
        cb(null,"uploads/")
    },
    filename:function(req,file,cb){
        cb(null,Date.now()+"-"+file.originalename)

    }
})

const upload = multer({storage:storage})
////////////////////


//Add Product İşlemi
app.post("/products/add",upload.single("image"),async(req,res)=>{
    try{
        const{name,categoryName,stock,price}= req.body;
        const product =new Product({
            _id:uuidv4(),
            name:name,
            stock:stock,
            price:price,
            categoryName:categoryName,
            imageUrl:req.file.path


        });
        await product.save();
        res.json({message:"Ürün Kaydı Başarıyla Tamamlandı"});
    }catch {
        res.status(500).json({message:error.message});
    }
});
///////////

//Product Sİlme İşlemi 
app.post("/products/remove",async(req,res)=>{
    try{
        const {_id} = req.body;
        await Product.findByIdAndRemove(_id);
        res.json({message:"Ürün Silme İşlemi Başarıyla Tamamlandı"});
    } catch (error){
        res.status(500).json({message:error.message});
    }
});
////////// 


// BASKET İŞLEMLERİ
///////AddBasket İşlemi
app.post("/baskets/add",async(req,res)=>{
    try{
        const {productId,userId} = req.body;//Burada userId ile productıd'yi aldık
        let basket = new Basket({
            _id:uuidv4(),
            productId:productId,
            userId:userId,

        });
        await basket.save()
        res.json({message:"Ürün Sepete Eklendi"})
        let product = await Product.findById(productId);
        product.stock = product.stock-1; //ürün sepete eklendiğinde veritabanından 1 tane düşeceğiz
        await Product.findByIdAndUpdate(productId,product); //Güncelliyoruz
    }catch (error){
        res.status(500).json({message:error.message});
    }
});


///////

//////GetBasket İşlemi
//Biz burada userId ile eşitlenen değerleri alıyoruz ve product tablosunda o değerlerin verilerini çekmeye yardımcı oluyoruz.
app.post("/baskets/getAll",async(req,res)=>{
    try {
        const{userId}=req.body //UserID'yi basket.jsx içinden alıyoruz method'dan
        const baskets= await Basket.aggregate([
            {
                $match:{userId: userId} //Burada değerleri eşledik
            },
            {
                $lookup:{  //MongoDB özelliği
                    from:"products",  //İlişkili tablo adı
                    localField:"productId",//Basket'de kullanılan alanın ismi
                    foreignField:"_id", //İlişkisel olarak product tablosunda localfield'in eşiti (primary/foreign key gibi)
                    as:"products" //Yeni alan
                }
            }
        ]);
        res.json(baskets);
    } catch (error) {
        res.status(500).json({message:error.message});
    }
})
//////////////

//RemoveBasket İşlemi///
app.post("/baskets/remove",async(req,res)=>{
    try{
        const {_id} = req.body;
        await Basket.findByIdAndRemove(_id);
        res.json({message:"Ürün Silme İşlemi Başarıyla Tamamlandı"});
    } catch (error){
        res.status(500).json({message:error.message});
    }
});


//SİPARİŞ İŞLEMLERİ

//Sipariş Ürün Ekleme

app.post("/orders/add",async(req,res)=>{
    try {
        const {userId}=req.body;  //UserID aldık
        const baskets =await Basket.find({userId:userId}); //Sepet tablosunda eşleşen verileri aldık
        for(const basket of baskets){ //for ile basket diye const oluşturduk
            let order = new Order({ //Yeni sipariş verisi oluşturduk
                _id:uuidv4(), //Eşsiz bir ID
                productId:basket.productId, //Sepetteki ürünün ID'sini aldık
                userId:userId, //Kullanıcı ID'sini aldık ve kayıt ettik
            });
            order.save(); //Order tablosuna kayıt ettik verileri
            await Basket.findByIdAndDelete(basket._id)//Sepetten kayıt edilen ürünü sildik 
        }//Yukarıda ürün sayısı kadar döngü dönüyor sonrasında bitiyor
        
    } catch (error) {
        res.status(500).json({message:error.message})
        
    }
})
app.post("/orders/getAll",async(req,res)=>{
    try {
        const{userId}=req.body //UserID'yi Order.jsx içinden alıyoruz method'dan
        const baskets= await Order.aggregate([
            {
                $match:{userId: userId} //Burada değerleri eşledik
            },
            {
                $lookup:{  //MongoDB özelliği
                    from:"products",  //İlişkili tablo adı
                    localField:"productId",//Basket'de kullanılan alanın ismi
                    foreignField:"_id", //İlişkisel olarak product tablosunda localfield'in eşiti (primary/foreign key gibi)
                    as:"products" //Yeni alan
                }
            }
        ]);
        res.json(baskets);
    } catch (error) {
        res.status(500).json({message:error.message});
    }
})
//Siparişleri Getirme