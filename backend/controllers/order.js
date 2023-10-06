const OrderModel = require('../models/order');
const { v4: uuidv4 } = require("uuid");

const getOrder = async (req, res) => {
    try {
        const orders = await OrderModel.aggregate([
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
                    as: "sellerInfo" // saklanacak alan bunun üzerinden çağırıcaz
                }
            },
            {
                $lookup: {
                    from: "users", // ilişkili tablo
                    localField: "userId", // orderda karşılığı
                    foreignField: "_id", // users'da karşılığı
                    as: "userInfo" // saklanacak alan bunun üzerinden çağırıcaz
                }
            },
        ]);

        res.json(orders);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

const addOrder = async (req, res) => {
    try {
        const BasketModel = require('../models/basket')
        const { userId } = req.body;  //UserID aldık
        const baskets = await BasketModel.find({ userId: userId }); //Sepet tablosunda eşleşen verileri aldık
        for (const basket of baskets) { //for ile basket diye const oluşturduk
            let order = new OrderModel({ //Yeni sipariş verisi oluşturduk
                _id: uuidv4(), //Eşsiz bir ID
                productId: basket.productId, //Sepetteki ürünün ID'sini aldık
                sellerId: basket.sellerId,
                userId: userId, //Kullanıcı ID'sini aldık ve kayıt ettik
            });
            order.save(); //Order tablosuna kayıt ettik verileri
            await BasketModel.findByIdAndDelete(basket._id)//Sepetten kayıt edilen ürünü sildik 
        }//Yukarıda ürün sayısı kadar döngü dönüyor sonrasında bitiyor

    } catch (error) {
        res.status(500).json({ message: error.message })

    }
}


module.exports = { getOrder, addOrder }