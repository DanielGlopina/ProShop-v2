import mongoose from "mongoose";
import { asyncHandler } from "../middlewares/async-handler.js";
import { BadRequestError } from "../errors/http-error.js";
import Product from "../models/product-model.js";

export const getProducts = asyncHandler(async (req, res) => {
  const products = await Product.find({});

  res.json(products);
});

export const getProductById = asyncHandler(async (req, res) => {
  const { id } = req.params;

  if (!mongoose.isValidObjectId(id)) {
    throw new BadRequestError("Product not found");
  }

  const products = await Product.findById(req.params.id);

  if (!products) {
    throw new BadRequestError("Product not found");
  }

  res.json(products);
});

export const addProduct = asyncHandler(async (req, res) => {
  const { name, image, description, category, price, brand, countInStock } =
    req.body;

  const newProduct = new Product({
    name,
    image,
    brand,
    category,
    description,
    reviews: [],
    rating: 0,
    numReviews: 0,
    price,
    countInStock,
  });

  const createdProduct = await newProduct.save();

  res.status(201).json(createdProduct);
});
