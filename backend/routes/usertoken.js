const {secureToken } = require('../controllers/usertoken.js');
const router = require('./route');

router.get('/secure-token', secureToken, (req, res) => {
  res.json({ message: 'Yetkilendirme başarılı!', user: req.user });
});

module.exports = router