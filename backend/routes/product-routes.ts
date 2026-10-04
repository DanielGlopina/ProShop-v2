import express from "express";
import { authHandler } from "../middlewares/auth-handler.js";
import { adminHandler } from "../middlewares/admin-handler.js";
import {
  getProducts,
  getProductById,
  addProduct,
} from "../controllers/product-controller.js";
import { addProductValidator } from "../validators/add-product-validator.js";
import { validateHandler } from "../middlewares/validate-handler.js";

const router = express.Router();

// @route   GET api/products
// @desc    Get all products
// @access  Public
router.get("/", getProducts);

// @route   POST api/products/add
// @desc    Add new product
// @access  Private/Admin
router.post(
  "/add",
  addProductValidator,
  validateHandler,
  authHandler,
  adminHandler,
  addProduct,
);

// @route   GET api/products/:id
// @desc    Get single product by id
// @access  Public
router.get("/:id", getProductById);

export default router;
