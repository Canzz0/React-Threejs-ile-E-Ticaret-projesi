const { getProduct, addProduct, removeProduct,searchProduct } = require('../controllers/product');
const router = require('./route');


router.get('/getproduct',getProduct);
router.post('/addproduct',addProduct);
router.post('/removeproduct',removeProduct);
router.get('/searchproduct', searchProduct);

module.exports = router