const ProductModel = require('../models/product.js');
const { v4: uuidv4 } = require("uuid");
const multer = require("multer");

//GET  getirme işlemleri
const getProduct = async (req,res) => {
  try {
    const products = await ProductModel.find({}).sort({ name: 1 });
    res.json(products);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message });
  }
};

const getProductDetail = async (req,res) => {
  try {
    const { _id } = req.body;
    const productdetail = await ProductModel.findById(_id);
    res.json(productdetail);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message });
  }
};



const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads");
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + "-" + file.originalname);
  },
});

const upload = multer({ storage: storage });
const addProduct = async (req, res) => {
  try {
  
    upload.fields([
      { name: "image", maxCount: 1 },
      { name: "figur", maxCount: 1 },
    ])(req, res, async (err) => {
      if (err) {
        console.error(err);
        return res.status(500).json({ message: "Dosya Yüklenemedi" });
      }
      const { name, description, sellerid, categoryName, stock, price } = req.body;
      const product = new ProductModel({
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
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message });
  }
};


////////////////////////////////////7

//Product Sİlme İşlemi
const removeProduct = async (req, res) => {
  try {
    const { _id } = req.body;
    await ProductModel.findByIdAndRemove(_id);
    res.json({ message: "Ürün Silme İşlemi Başarıyla Tamamlandı" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

////////////////////////////////////7

//Product Arama (SearchProduct) İşlemi

const searchProduct = async (req, res) => {
  try {
    const searchTerm = req.query.search;

    // Boş bir arama terimi gönderildiğinde tüm ürünleri getirin
    if (!searchTerm) {
      const products = await ProductModel.find({}).sort({ name: 1 });
      res.json(products);
      return;
    }

    const products = await ProductModel.find({
      $or: [
        { name: { $regex: searchTerm, $options: 'i' } },
        { description: { $regex: searchTerm, $options: 'i' } },
      ],
    }).sort({ name: 1 });

    res.json(products);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { getProduct,getProductDetail, addProduct, removeProduct,searchProduct };