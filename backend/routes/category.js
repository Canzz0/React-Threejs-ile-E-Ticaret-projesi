const { getCategory, removeCategory, addCategory } = require('../controllers/category');
const router = require('./route');

router.get('/getcategory',getCategory);
router.post('/addcategory',addCategory);
router.post('/removecategory',removeCategory);

module.exports = router