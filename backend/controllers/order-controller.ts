import { Request, Response } from "express";
import { asyncHandler } from "../middlewares/async-handler.js";
import { BadRequestError } from "../errors/http-error.js";
import {
  createOrder,
  getMyOrdersService,
  getOrderByIdService,
  updateOrderToPaidService,
} from "../services/order-service.js";
import {
  captureOrderByIdService,
  capturePaypalOrderService,
  createPaypalOrderService,
} from "../services/paypal-order-service.js";

const getShopOrderId = (req: Request) => {
  const shopOrderId = Array.isArray(req.params.shopOrderId)
    ? req.params.shopOrderId[0]
    : (req.params.shopOrderId ?? req.body?.shopOrderId);

  return shopOrderId;
};

// @route   POST api/orders
// @desc    Create new order
// @access  Public
export const addOrderItems = asyncHandler(async (req, res) => {
  const {
    contacts,
    orderItems,
    shippingAddress,
    paymentMethod,
    shippingPrice,
  } = req.body;

  const createdOrder = await createOrder({
    contacts,
    orderItems,
    shippingAddress,
    paymentMethod,
    shippingPrice,
    userId: req.user?.id,
  });

  res.status(201).json(createdOrder);
});

// @route   GET api/orders/myorders
// @desc    Get logged in user orders
// @access  Private
export const getMyOrders = asyncHandler(async (req, res) => {
  const orders = await getMyOrdersService(req.user?.id);
  res.status(200).json(orders);
});

// @route   GET api/orders/:id
// @desc    Get order by ID
// @access  Private/Admin
export const getOrderById = asyncHandler(async (req, res) => {
  const orderId = Array.isArray(req.params.id)
    ? req.params.id[0]
    : req.params.id;
  const order = await getOrderByIdService(orderId);
  res.status(200).json(order);
});

// @route   PUT api/orders/:id/pay
// @desc    Update order to paid
// @access  Private/Admin
export const updateOrderToPaid = asyncHandler(async (req, res) => {
  const orderId = Array.isArray(req.params.id)
    ? req.params.id[0]
    : req.params.id;
  const updatedOrder = await updateOrderToPaidService(orderId);
  res.status(200).json(updatedOrder);
});

// @route   POST api/orders/:deliver
// @desc    Update order to paid
// @access  Private/Admin
export const updateToDelivered = asyncHandler(async (_req, res) => {
  res.send("update order to delivered");
});

// @route   GET api/orders
// @desc    Get all orders
// @access  Private/Admin
export const getOrders = asyncHandler(async (_req, res) => {
  res.send("get orders");
});

export const createPaypalOrder = asyncHandler(async (req, res) => {
  const shopOrderId = getShopOrderId(req);

  if (!shopOrderId) {
    throw new BadRequestError("shopOrderId is required");
  }

  const response = await createPaypalOrderService(shopOrderId, req.user);
  res.status(200).json(response);
});

export const capturePaypalOrder = asyncHandler(async (req, res) => {
  const shopOrderId = getShopOrderId(req);
  const paypalOrderId = req.body?.paypalOrderId ?? req.body?.orderId;

  if (!shopOrderId) {
    throw new BadRequestError("shopOrderId is required");
  }

  if (!paypalOrderId) {
    throw new BadRequestError("paypalOrderId is required");
  }

  const updatedOrder = await capturePaypalOrderService(
    shopOrderId,
    paypalOrderId,
    req.user,
  );

  res.status(200).json(updatedOrder);
});

export const captureOrder = asyncHandler(async (req, res: Response) => {
  const id = Array.isArray(req.params.id) ? req.params.id[0] : req.params.id;
  const result = await captureOrderByIdService(id);
  res.status(200).json(result);
});
