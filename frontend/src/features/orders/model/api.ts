import z from "zod";
import { baseApi } from "@/shared/api";
import type {
  Order,
  PayPalCreateOrderResponse,
  PayPalServerConfig,
} from "../types";

type CaptureOrderValues = { shopOrderId: string; paypalOrderId: string };

export const OrderDtoSchema = z.object({
  _id: z.string(),
  user: z.string(),
  orderItems: z.array(
    z.object({
      name: z.string(),
      qty: z.number(),
      image: z.string(),
      price: z.number(),
      product: z.string(),
    }),
  ),
  shippingAddress: z.object({
    address: z.string(),
    city: z.string(),
    postalCode: z.string(),
    country: z.string(),
  }),
  paymentResult: z
    .object({
      id: z.string().optional(),
      status: z.string().optional(),
      update_time: z.string().optional(),
      email_address: z.string().optional(),
    })
    .optional(),
  itemsPrice: z.number(),
  taxPrice: z.number(),
  shippingPrice: z.number(),
  totalPrice: z.number(),
  isPaid: z.boolean(),
  paidAt: z.coerce.date().optional(),
  isDelivered: z.boolean(),
  deliveredAt: z.coerce.date().optional(),
  createdAt: z.coerce.date(),
  updatedAt: z.coerce.date(),
});

export const ordersApi = baseApi.injectEndpoints({
  endpoints: (create) => ({
    createOrder: create.mutation({
      query: (order: Order) => ({
        url: "/orders",
        method: "POST",
        body: { ...order },
      }),
      invalidatesTags: ["Orders"],
    }),
    getOrderDetails: create.query<Order, string>({
      query: (orderId: string) => ({
        url: `/orders/${orderId}`,
      }),
      keepUnusedDataFor: 5,
    }),
    loadPayPalConfig: create.query<PayPalServerConfig, void>({
      query: () => ({
        url: "/paypal/config",
      }),
    }),
    createPayPalOrder: create.mutation<PayPalCreateOrderResponse, string>({
      query: (orderId: string) => ({
        url: `/orders/${orderId}/paypal/create`,
        method: "POST",
      }),
    }),
    captureOrder: create.mutation<Order, CaptureOrderValues>({
      query: ({ shopOrderId, paypalOrderId }) => ({
        url: `/orders/${shopOrderId}/paypal/capture`,
        method: "POST",
        body: {
          shopOrderId: shopOrderId,
          paypalOrderId,
        },
      }),
      invalidatesTags: ["Orders"],
    }),
  }),
});

// { orderId: string; paypalOrderId: string }
export const {
  useCreateOrderMutation,
  useGetOrderDetailsQuery,
  useLoadPayPalConfigQuery,
  useCreatePayPalOrderMutation,
  useCaptureOrderMutation,
} = ordersApi;
