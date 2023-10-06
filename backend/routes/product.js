const { getProduct, addProduct, removeProduct } = require('../controllers/product');
const router = require('./route');


router.get('/getproduct',getProduct);
router.post('/addproduct',addProduct);
router.post('/removeproduct',removeProduct);


module.exports = router