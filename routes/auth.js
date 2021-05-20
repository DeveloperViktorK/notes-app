const express = require("express");
var router = express.Router();
const User = require("../models/user");
const Users = require("../controllers/users.controller");
const { validationResult } = require("express-validator");
const { registerValidators } = require("../lib/middleware/reg-validation");
const { loginValidators } = require("../lib/middleware/login-validation");
const cryptoHelp = require("../lib/crypto-helper");
const jwt = require("jsonwebtoken");
const auth = require("../lib/middleware/auth.middleware");

const config = require("config");

// Registration new user
router.post("/register", registerValidators, async function (req, res, next) {
  try {
    const { username, email, password } = req.body;

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        message: "Пользователь не создан",
        error: errors.array()[0].msg,
      });
    }

    const hashPass = await cryptoHelp.hashPassword(password);
    const user = new User({
      username,
      email,
      password: hashPass,
    });
    await user.save();
    return res.status(201).json("");
  } catch (error) {
    console.log("Error", error);
    return res.status(500).json({
      message: "Server error",
    });
  }
});

// Check auth
router.post("/login", loginValidators, async function (req, res, next) {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        message: "Ошибка аутентификации",
        error: errors.array()[0].msg,
      });
    }

    const { email, password } = req.body;
    const user = await User.findAll({
      where: { email },
    });
    if (user && user.length > 0) {
      const isMatch = await cryptoHelp.checkPassword(
        password,
        user[0].password
      );

      if (isMatch) {
        const token = jwt.sign(
          { userId: user[0].id, email: user[0].email },
          config.get("JWT_SECRET"),
          { expiresIn: "1d" }
        );

        res.status(200).json({
          token,
          userId: user[0].id,
          email: user[0].email,
        });
      } else {
        return res.status(400).json({
          message: "Некорректные имя пользователя или пароль",
        });
      }
    } else {
      return res.status(400).json({
        message: "Некорректные имя пользователя или пароль",
      });
    }
  } catch (error) {
    console.log("Error", error);
    return res.status(500).json({
      message: "Server error",
    });
  }
});

// Logout
router.get("/logout", auth, async (req, res) => {
  const token = req.headers.authorization.split(" ")[1];
  // Token нельзя убить
  //jwt.destroy(token);
});

module.exports = router;
