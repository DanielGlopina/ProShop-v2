import express from "express";
import { authHandler } from "../middlewares/auth-handler.js";
import { adminHandler } from "../middlewares/admin-handler.js";
import { orderAuthHandler } from "../middlewares/order-auth-handler.js";
import { validateHandler } from "../middlewares/validate-handler.js";
import { orderValidator } from "../validators/order-validator.js";

import {
  addOrderItems,
  getMyOrders,
  getOrderById,
  updateOrderToPaid,
  getOrders,
  capturePaypalOrder,
  createPaypalOrder,
  captureOrder,
} from "../controllers/order-controller.js";

const router = express.Router();

router.post(
  "/",
  orderAuthHandler,
  orderValidator,
  validateHandler,
  addOrderItems,
);
router.get("/", authHandler, adminHandler, getOrders);
router.get("/myorders", authHandler, getMyOrders);

router.post("/:shopOrderId/paypal/create", authHandler, createPaypalOrder);
router.post("/:shopOrderId/paypal/capture", authHandler, capturePaypalOrder);

router.get("/:id", getOrderById);
router.put("/:id/pay", updateOrderToPaid);
router.put("/:id/deliver", authHandler, adminHandler, updateOrderToPaid);
router.post("/:id/capture", captureOrder);

export default router;
