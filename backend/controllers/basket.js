const BasketModel = require('../models/basket');
const ProductModel = require('../models/product')
const { v4: uuidv4 } = require("uuid");


const getBasket = async (req, res) => {
              try {
                            const { userId } = req.body //UserID'yi basket.jsx içinden alıyoruz method'dan
                            const baskets = await BasketModel.aggregate([
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
                            res.status(500).json({ message: error.message })
              }
}

const addBasket = async (req,res) =>{
              try {
                            const { productId, sellerId, userId } = req.body;//Burada userId ile productıd'yi aldık
                            let basket = new BasketModel({
                                _id: uuidv4(),
                                productId: productId,
                                userId: userId,
                                sellerId: sellerId,
                            });
                            await basket.save()
                            res.json({ message: "Ürün Sepete Eklendi" })
                            let ProductModel = await ProductModel.findById(productId);
                            ProductModel.stock = ProductModel.stock - 1; //ürün sepete eklendiğinde veritabanından 1 tane düşeceğiz
                            await ProductModel.findByIdAndUpdate(productId, ProductModel); //Güncelliyoruz
                        } catch (error) {
                            res.status(500).json({ message: error.message });
                        }
}

const removeBasket = async (req,res) =>{
              try {
                            const { _id } = req.body;
                            await BasketModel.findByIdAndRemove(_id);
                            res.json({ message: "Ürün Silme İşlemi Başarıyla Tamamlandı" });
                        } catch (error) {
                            res.status(500).json({ message: error.message });
                        }
}


module.exports ={getBasket,addBasket,removeBasket};