import { body } from "express-validator";

export const addProductValidator = [
  body("name")
    .isString()
    .withMessage("Name must contain at least 3 characters.")
    .trim()
    .isLength({ min: 3 })
    .withMessage("Name must contain at least 3 characters."),

  body("image")
    .isString()
    .withMessage("Upload an image.")
    .notEmpty()
    .withMessage("Upload an image."),

  body("description")
    .isString()
    .withMessage("Description must contain at least 10 characters.")
    .trim()
    .isLength({ min: 10 })
    .withMessage("Description must contain at least 10 characters."),

  body("brand")
    .isString()
    .withMessage("Brand must contain at least 2 characters.")
    .trim()
    .isLength({ min: 2 })
    .withMessage("Brand must contain at least 2 characters."),

  body("category")
    .isString()
    .withMessage("Category must be one of: Electronics, Clothing, Home & Kitchen.")
    .bail()
    .isIn(["Electronics", "Clothing", "Home & Kitchen"])
    .withMessage("Category must be one of: Electronics, Clothing, Home & Kitchen."),

  body("price")
    .isNumeric({ no_symbols: false })
    .withMessage("Price must be a number.")
    .bail()
    .toFloat()
    .isFloat({ gt: 0 })
    .withMessage("Price must be greater than 0."),

  body("countInStock")
    .isNumeric({ no_symbols: false })
    .withMessage("Stock must be a number.")
    .bail()
    .toFloat()
    .isInt({ min: 0 })
    .withMessage("Stock must be a non-negative integer."),
];
