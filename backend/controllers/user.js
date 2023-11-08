
const UserModel = require('../models/user.js');
const jwt = require("jsonwebtoken");
const bcrypt = require('bcrypt');
const { v4: uuidv4 } = require("uuid");
const secretKey = 'Gizli Anahtar';
const register = async (req, res) => {
  try {
    const { name, email, password, role } = req.body;  //req body üzerinden verileri alır
    const userEmail = await UserModel.findOne({ email })

    if (userEmail) {
      return res.status(500).json({ message: 'Bu E-Mail hesabı zaten bulunmakta !!' })
    }

    if (password.length < 6) {
      return res.status(500).json({ message: 'Parolanız 6 Karakterden küçük olmamalı!!' })

    }
    //ŞİFRE hashleme için kullanıcaz
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);
    let user = new UserModel({
      _id: uuidv4(),
      name: name,
      email: email,
      password: hashedPassword,
      isAdmin: false,
      role: role
    });
    await user.save();
    const payload = {
      user: user,
      role: role,
    }
    const token = jwt.sign(payload, secretKey, { expiresIn: "1h" })

    res.status(200).json({
      status: 'Ok',
      user,
      token
    });
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
}

const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await UserModel.findOne({ email: email });

    if (!user) {
      res.status(500).json({ message: "Böyle bir kullanıcı bulunmamakta!" });
    } else {
      // Bcrypt ile şifreyi karşılaştırma,çözümleme
      const passwordMatch = await bcrypt.compare(password, user.password);

      if (passwordMatch) {
        const payload = {
          user: user
        };
        const token = jwt.sign(payload, secretKey, { expiresIn: "1h" })

        res.status(200).json({
          status: 'Ok',
          user: user,
          token: token
        })

      } else {
        res.status(500).json({ message: "Şifrenizi kontrol ediniz!!" });
      }
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


const updateUser = async (req, res) => {
  try {
    const { id, email, password, name } = req.body;
    if (password && password.length < 6) {
      return res.status(500).json({ error: 'Parolanız 6 karakterden küçük olmamalı!!' });
    }
    const saltRounds = 10;
    if (password) {
      const hashedPassword = await bcrypt.hash(password, saltRounds);
      await UserModel.findByIdAndUpdate(id, { email: email, password: hashedPassword, name: name });
    } else {
      await UserModel.findByIdAndUpdate(id, { email: email, name: name });
    }

    res.json({ message: 'Güncelleme işlemi başarı ile gerçekleştirildi' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};




module.exports = { register, login, updateUser };
