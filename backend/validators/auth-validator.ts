import { body } from "express-validator";

export const registerValidator = [
  body("name")
    .trim()
    .notEmpty()
    .withMessage("Name is required")
    .isLength({ min: 2, max: 50 })
    .withMessage("Name shoud have length between 2 & 50 characters")
    .matches(/^[a-zA-Zа-яА-ЯёЁіІїЇєЄ'\s-]+$/)
    .withMessage("Name should not contain numbers & spec. symbols")
    .escape(),

  body("email")
    .trim()
    .normalizeEmail()
    .isEmail()
    .withMessage("Incorrect email format"),

  body("password")
    .isLength({ min: 3, max: 32 })
    .withMessage("Password shoud have length between 3 & 32 characters"),
];
