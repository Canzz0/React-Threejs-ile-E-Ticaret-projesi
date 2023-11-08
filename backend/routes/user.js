const { register, login, updateUser } = require('../controllers/user.js');
const router = require('./route');

router.post('/register',register)
router.post('/login',login)
router.post('/updateuser',updateUser)

module.exports = router