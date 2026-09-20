import mongoose from "mongoose";
import { asyncHandler } from "../middlewares/asyncHandler.js";
import { NotFoundError } from "../errors/http-error.js";
import Product from "../models/product-model.js";

const getProducts = asyncHandler(async (req, res) => {
  const products = await Product.find({});

  res.json(products);
});

const getProductById = asyncHandler(async (req, res) => {
  const { id } = req.params;

  if (!mongoose.isValidObjectId(id)) {
    throw new NotFoundError("Product not found");
  }

  const products = await Product.findById(req.params.id);

  if (!products) {
    throw new NotFoundError("Product not found");
  }

  res.json(products);
});

export { getProducts, getProductById };
