import type { Request } from "express";
import { CheckoutPaymentIntent } from "@paypal/paypal-server-sdk";
import { BadRequestError } from "../errors/http-error.js";
import { paypal } from "../config/paypal.js";
import { getAccessibleUnpaidOrder } from "./order-service.js";

const { ordersController } = paypal();

export const normalizeMoney = (value: number) => Number(value).toFixed(2);

export const validatePaypalCapture = ({
  orderTotal,
  paypalOrder,
  capture,
}: {
  orderTotal: number;
  paypalOrder: { status?: string } | null | undefined;
  capture: { amount?: { value?: string } } | null | undefined;
}) => {
  const capturedAmount = Number(capture?.amount?.value ?? "0");

  if (paypalOrder?.status !== "COMPLETED") {
    throw new BadRequestError("PayPal capture was not completed");
  }

  if (!capture || !capture.amount || !capture.amount.value) {
    throw new BadRequestError("PayPal capture data is missing");
  }

  if (Math.abs(capturedAmount - Number(orderTotal)) > 0.01) {
    throw new BadRequestError(
      "Captured amount does not match the shop order total",
    );
  }
};

export const createPaypalOrderService = async (
  shopOrderId: string,
  user: Request["user"],
) => {
  const order = await getAccessibleUnpaidOrder(shopOrderId, user);

  if (order.paymentMethod !== "PayPal") {
    throw new BadRequestError("This order does not use PayPal payment");
  }

  const paypalOrderRequest = {
    intent: CheckoutPaymentIntent.Capture,
    purchaseUnits: [
      {
        referenceId: order._id.toString(),
        description: `Shop order ${order._id}`,
        items: order.orderItems.map((item) => ({
          name: item.name,
          quantity: String(item.qty),
          unitAmount: {
            currencyCode: "USD",
            value: normalizeMoney(item.price),
          },
          sku: item.product.toString(),
        })),
        amount: {
          currencyCode: "USD",
          value: normalizeMoney(order.totalPrice),
          breakdown: {
            itemTotal: {
              currencyCode: "USD",
              value: normalizeMoney(order.itemsPrice),
            },
            shipping: {
              currencyCode: "USD",
              value: normalizeMoney(order.shippingPrice),
            },
          },
        },
      },
    ],
  };

  const { result } = await ordersController.createOrder({
    body: paypalOrderRequest,
  });

  if (!result?.id) {
    throw new BadRequestError("PayPal order creation returned no order ID");
  }

  return {
    id: result.id,
    status: result.status,
    shopOrderId: order._id.toString(),
  };
};

export const capturePaypalOrderService = async (
  shopOrderId: string,
  paypalOrderId: string,
  user: Request["user"],
) => {
  const order = await getAccessibleUnpaidOrder(shopOrderId, user);

  if (order.paymentMethod !== "PayPal") {
    throw new BadRequestError("This order does not use PayPal payment");
  }

  const { result: paypalOrder } = await ordersController.captureOrder({
    id: paypalOrderId,
  });

  const capture = paypalOrder?.purchaseUnits?.[0]?.payments?.captures?.[0];

  validatePaypalCapture({
    orderTotal: Number(order.totalPrice),
    paypalOrder,
    capture,
  });

  const captureStatus = capture?.status ?? paypalOrder?.status;
  const captureUpdateTime = new Date(
    capture?.updateTime ?? paypalOrder?.updateTime ?? Date.now(),
  );

  order.isPaid = true;
  order.paidAt = new Date();
  order.paymentResult = {
    id: paypalOrderId,
    status: captureStatus,
    update_time: captureUpdateTime,
    email_address:
      (paypalOrder.payer as { emailAddress?: string } | undefined)
        ?.emailAddress ??
      order.contacts?.email ??
      "",
  };

  return order.save();
};

export const captureOrderByIdService = async (id: string) => {
  const { result } = await ordersController.captureOrder({ id });
  return result;
};
