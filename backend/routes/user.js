const { register, login } = require('../controllers/user.js');
const router = require('./route');

router.post('/register',register)
router.post('/login',login)


module.exports = router