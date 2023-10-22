const { getProduct, getProductDetail, addProduct, removeProduct,searchProduct } = require('../controllers/product');
const router = require('./route');


router.get('/getproduct',getProduct);
router.get('/getproductdetail',getProductDetail);
router.post('/addproduct',addProduct);
router.post('/removeproduct',removeProduct);
router.get('/searchproduct', searchProduct);

module.exports = router