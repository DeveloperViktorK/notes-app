const { body } = require("express-validator");

exports.loginValidators = [
  body("email")
    .isLength({ min: 6, max: 56 })
    .withMessage("Введите действительный email")
    .isEmail()
    .withMessage("Введите действительный email")
    .normalizeEmail()
    .toLowerCase()
    .trim(),
  body("password")
    .not()
    .matches(/\s/)
    .isLength({ min: 6, max: 56 })
    .matches(/\d/)
    .matches(/\w/),
];
