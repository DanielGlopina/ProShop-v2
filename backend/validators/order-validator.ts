import { body } from "express-validator";

export const orderValidator = [
  body("contacts").isObject().withMessage("Contacts are required."),
  body("contacts.name")
    .isString()
    .withMessage("Name is required.")
    .bail()
    .trim()
    .isLength({ min: 2, max: 100 })
    .withMessage("Name must contain between 2 and 100 characters."),
  body("contacts.email")
    .isEmail()
    .withMessage("A valid email is required.")
    .normalizeEmail(),
  body("contacts.phoneNumber")
    .isString()
    .withMessage("Phone number is required.")
    .bail()
    .trim()
    .isLength({ min: 5, max: 30 })
    .withMessage("Phone number must contain between 5 and 30 characters."),

  body("orderItems")
    .isArray({ min: 1 })
    .withMessage("At least one order item is required."),
  body("orderItems.*._id")
    .isMongoId()
    .withMessage("Each order item must contain a valid product ID."),
  body("orderItems.*.name")
    .isString()
    .withMessage("Each order item must contain a product name.")
    .bail()
    .trim()
    .notEmpty()
    .withMessage("Each order item must contain a product name."),
  body("orderItems.*.image")
    .isString()
    .withMessage("Each order item must contain an image URL.")
    .bail()
    .trim()
    .notEmpty()
    .withMessage("Each order item must contain an image URL."),
  body("orderItems.*.qty")
    .isInt({ min: 1 })
    .withMessage("Item quantity must be a positive integer.")
    .toInt(),
  body("orderItems.*.price")
    .isFloat({ gt: 0 })
    .withMessage("Item price must be greater than 0.")
    .toFloat(),

  body("shippingAddress").isObject().withMessage("Shipping address is required."),
  body("shippingAddress.address")
    .isString()
    .withMessage("Address is required.")
    .bail()
    .trim()
    .notEmpty()
    .withMessage("Address is required."),
  body("shippingAddress.city")
    .isString()
    .withMessage("City is required.")
    .bail()
    .trim()
    .notEmpty()
    .withMessage("City is required."),
  body("shippingAddress.postalCode")
    .isString()
    .withMessage("Postal code is required.")
    .bail()
    .trim()
    .notEmpty()
    .withMessage("Postal code is required."),
  body("shippingAddress.country")
    .isString()
    .withMessage("Country is required.")
    .bail()
    .trim()
    .notEmpty()
    .withMessage("Country is required."),

  body("paymentMethod")
    .isIn(["PayPal", "COD", "Stripe"])
    .withMessage("Payment method must be PayPal, COD, or Stripe."),
  body("itemsPrice")
    .isFloat({ min: 0 })
    .withMessage("Items price must be a non-negative number.")
    .toFloat(),
  body("shippingPrice")
    .isFloat({ min: 0 })
    .withMessage("Shipping price must be a non-negative number.")
    .toFloat(),
  body("totalPrice")
    .isFloat({ min: 0 })
    .withMessage("Total price must be a non-negative number.")
    .toFloat(),
];