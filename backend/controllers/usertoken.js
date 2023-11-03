const jwt = require('jsonwebtoken');
const UserModel = require('../models/user');
const secretKey = 'Gizli Anahtar';


const secureToken = async (req, res, next) => {
  try {

    const token = req.header('Authorization');
    if (!token) {
      return res.status(401).json({ message: 'Yetkilendirme başarısız: Token eksik.' });
    }

    // Tokeni doğrulama
    jwt.verify(token, secretKey, async (err, decoded) => {
      if (err) {
        return res.status(401).json({ message: 'Yetkilendirme başarısız: Geçersiz token.' });
      }
      const user = decoded.user;

      const foundUser = await UserModel.findById(user._id);

      if (!foundUser) {
        return res.status(404).json({ message: 'Kullanıcı bulunamadı.' });
      }

      const { _id, name, isAdmin, role } = foundUser;

      req.user = { _id, name, isAdmin, role };
      next();
    });
  } catch (error) {
    res.status(500).json({ message: 'Sunucu hatası: Kullanıcı bilgileri alınamadı.' });
  }
};

module.exports = { secureToken }
