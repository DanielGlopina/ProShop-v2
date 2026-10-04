import { body } from "express-validator";

export const registerValidator = [
  body("name")
    .isString()
    .withMessage("Name must be at least 2 characters long.")
    .trim()
    .isLength({ min: 2 })
    .withMessage("Name must be at least 2 characters long.")
    .isLength({ max: 50 })
    .withMessage("Name must not exceed 50 characters.")
    .matches(/^[A-Za-z][A-Za-z '-]*$/)
    .withMessage("Name may contain only letters, spaces, apostrophes, and hyphens."),

  body("email")
    .isString()
    .withMessage("Email is required.")
    .trim()
    .notEmpty()
    .withMessage("Email is required.")
    .isEmail()
    .withMessage("Enter a valid email address.")
    .isLength({ max: 254 })
    .withMessage("Email must not exceed 254 characters."),

  body("password")
    .isString()
    .withMessage("Password must be at least 3 characters long.")
    .isLength({ min: 3 })
    .withMessage("Password must be at least 3 characters long.")
    .isLength({ max: 32 })
    .withMessage("Password must not exceed 32 characters.")
    .matches(/[A-Za-z]/)
    .withMessage("Password must contain at least one letter.")
    .matches(/\d/)
    .withMessage("Password must contain at least one number."),
];

export const loginValidator = [
  body("email").isString(),
  body("password")
    .isString()
    .withMessage("Password is required.")
    .notEmpty()
    .withMessage("Password is required."),
];
