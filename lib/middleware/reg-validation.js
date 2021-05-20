const { body } = require("express-validator");
const User = require("../../models/user");

exports.registerValidators = [
  body("email")
    .isLength({ min: 6, max: 56 })
    .withMessage("Введите корректный email")
    .isEmail()
    .withMessage("Введите корректный email")
    .toLowerCase()
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
  body("password", "Пароль должен быть минимум 6 символов и содержать цифры")
    .not()
    .matches(/\s/)
    .withMessage("Без пробелов")
    .isLength({ min: 6, max: 56 })
    .withMessage("Некорректная длина")
    .matches(/\d/)
    .withMessage("Пароль должен содержать цифры")
    .matches(/[A-Za-z]/)
    .withMessage("Пароль должен содержать буквы"),
  body("confirm")
    .custom((value, { req }) => {
      if (value !== req.body.password) {
        throw new Error("Пароли должны совпадать");
      }
      return true;
    })
    .trim(),
  body("username")
    .isLength({ min: 3, max: 20 })
    .withMessage("Имя должно быть минимум 3 символа, но не более 20")
    .trim(),
];
