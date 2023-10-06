const {getBasket,addBasket,removeBasket} = require('../controllers/basket')
const router = require('./route')


router.post('/getbasket',getBasket);
router.post('/addbasket',addBasket);
router.post('/removebasket',removeBasket);

module.exports = router