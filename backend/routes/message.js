const { getMessage} = require('../controllers/message');
const router = require('./route');

router.get('/getmessage',getMessage);

module.exports = router