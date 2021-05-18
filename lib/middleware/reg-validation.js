const { body } = require("express-validator");
const User = require("../../models/user");

exports.registerValidators = [
  body("email")
    .isEmail()
    .withMessage("Введите корректный email")
    .custom(async (value, { req }) => {
      try {
        const user = await User.findAll({
          where: { email: value },
        });
        if (user && user.length > 0) {
          return Promise.reject("Такой пользователь уже зарегистрирован");
        }
      } catch (e) {
        console.log(e);
      }
    })
    .normalizeEmail(),
  body("password", "Пароль должен быть минимум 6 символов")
    .isLength({ min: 6, max: 56 })
    .isAlphanumeric()
    .trim(),
  body("confirm")
    .custom((value, { req }) => {
      if (value !== req.body.password) {
        throw new Error("Пароли должны совпадать");
      }
      return true;
    })
    .trim(),
  body("username")
    .isLength({ min: 6 })
    .withMessage("Имя должно быть минимум 6 символов")
    .trim(),
];
