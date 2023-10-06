const { getOrder,addOrder } = require('../controllers/order');
const router = require('./route');


router.post('/getorder',getOrder);
router.post('/addorder',addOrder);

module.exports = router