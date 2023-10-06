const CategoryModel = require('../models/category');



const getCategory = async (req, res) => {
              try {
                            const categories = await CategoryModel.find({}).sort({ name: 1 });
                            res.json(categories);
              } catch (error) {
                            console.log(error);
                            res.status(500).json({ message: error.message });
              }
};

const addCategory = async (req, res) => {
              try {
                            const { name } = req.body;
                            const category = new CategoryModel({
                                          name: name
                            })
                            await category.save();
                            res.json({ message: "Kategori Kaydı Başarıyla Tamamlandı" });

              }
              catch (error) {
                            res.status(500).json({ message: error.message });

              }
}

const removeCategory = async (req, res) => {
              try {
                            const { _id } = req.body;
                            await CategoryModel.findByIdAndRemove(_id);
                            res.json({ message: "Kategori Silme İşlemi Başarıyla Tamamlandı" })

              } catch (error) {
                            res.status(500).json({ message: error.message })

              }
}


module.exports = { getCategory, removeCategory, addCategory };
