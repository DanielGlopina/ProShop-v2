import mongoose from "mongoose";
import type { Request } from "express";
import {
  BadRequestError,
  ForbiddenError,
  NotFoundError,
  UnauthorizedError,
} from "../errors/http-error.js";
import { Order } from "../models/order-model.js";
import Product from "../models/product-model.js";

export type OrderItemInput = {
  _id: string;
  qty: number;
};

export const createOrder = async ({
  contacts,
  orderItems,
  shippingAddress,
  paymentMethod,
  shippingPrice,
  userId,
}: {
  contacts: unknown;
  orderItems: OrderItemInput[];
  shippingAddress: unknown;
  paymentMethod: string;
  shippingPrice: number;
  userId?: string;
}) => {
  if (!Array.isArray(orderItems) || orderItems.length === 0) {
    throw new BadRequestError("No orders found");
  }

  const productIds = orderItems.map((item) => item._id);
  const products = await Product.find({ _id: { $in: productIds } });
  const productsById = new Map(
    products.map((product) => [product.id, product]),
  );

  const verifiedOrderItems = orderItems.map((item) => {
    const product = productsById.get(item._id);

    if (!product) {
      throw new NotFoundError(`Product ${item._id} was not found`);
    }

    if (item.qty > product.countInStock) {
      throw new BadRequestError(
        `Not enough stock for ${product.name}. Available: ${product.countInStock}.`,
      );
    }

    return {
      product: product._id,
      name: product.name,
      image: product.image,
      price: product.price,
      qty: item.qty,
    };
  });

  const itemsPrice = Number(
    verifiedOrderItems
      .reduce((sum, item) => sum + item.price * item.qty, 0)
      .toFixed(2),
  );
  const totalPrice = Number((itemsPrice + shippingPrice).toFixed(2));

  const order = new Order({
    orderItems: verifiedOrderItems,
    contacts,
    shippingAddress,
    paymentMethod,
    itemsPrice,
    shippingPrice,
    totalPrice,
    isPaid: false,
    isDelivered: false,
  });

  if (userId) {
    order.user = new mongoose.Types.ObjectId(userId);
  }

  return order.save();
};

export const getMyOrdersService = async (userId?: string) => {
  if (!userId) {
    return [];
  }

  return Order.find({ user: userId });
};

export const getOrderByIdService = async (id: string) => {
  const order = await Order.findById(id).populate("user", "name email");

  if (!order) {
    throw new NotFoundError("Order by passed ID not found");
  }

  return order;
};

export const updateOrderToPaidService = async (id: string) => {
  const order = await Order.findById(id);

  if (!order) {
    throw new NotFoundError("Order not found!");
  }

  order.isPaid = true;
  order.paidAt = new Date(Date.now());

  return order.save();
};

export const getAccessibleUnpaidOrder = async (
  shopOrderId: string,
  user: Request["user"],
) => {
  if (!user) {
    throw new UnauthorizedError("Authentication required");
  }

  const order = await Order.findById(shopOrderId);

  if (!order) {
    throw new NotFoundError("Shop order not found");
  }

  const isOwner = order.user?.toString() === user.id;
  if (!isOwner && !user.isAdmin) {
    throw new ForbiddenError("You do not have permission to access this order");
  }

  if (order.isPaid) {
    throw new BadRequestError("This order has already been paid");
  }

  return order;
};
