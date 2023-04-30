const router = require("express").Router();
const { body, validationResult } = require("express-validator");
const CryptoJS = require("crypto-js");
const User = require("../models/user");
const JWT = require("jsonwebtoken");
require("dotenv").config();

router.post(
  "/register",
  body("username").isLength({ min: 8 }).withMessage("password over 8"),
  body("password").isLength({ min: 8 }).withMessage("password over 8"),
  body("confirmPassword").isLength({ min: 8 }).withMessage("password over 8"),
  body("username").custom((value) => {
    return User.findOne({
      username: value,
    }).then((user) => {
      if (user) {
        return Promise.reject("already user exist");
      }
    });
  }),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  },
  async (req, res) => {
    // パスワードの暗号化
    const password = req.body.password;

    try {
      s;
      req.body.password = CryptoJS.AES.encrypt(
        password,
        process.env.SECRET_KEY
      );
      const user = await User.create(req.body);
      const token = JWT.sign({ id: user._id }, process.env.TOKEN_SECRET_KEY, {
        expiresIn: "24h",
      });

      return res.status(200).json({ user, token });
    } catch (err) {
      return res.status(500).json(err);
    }
  }
);

module.exports = router