import type { CartArrayItem, PaymentMethod } from "../cart/types";

export type ShippingAddress = {
  address: string;
  city: string;
  postalCode: string;
  country: string;
};

export type Order = {
  _id?: string;
  contacts: {
    name: string;
    email: string;
    phoneNumber: string;
  };
  orderItems: CartArrayItem[];
  shippingAddress: ShippingAddress;
  paymentMethod: PaymentMethod;
  itemsPrice: number;
  shippingPrice: number;
  totalPrice: number;
  isDelivered?: boolean;
  isPaid?: boolean;
  paidAt?: Date;
  deliveredAt?: Date;
};

export type PayPalServerConfigEnv = "production" | "sandbox";

export type PayPalServerConfig = {
  clientId: string;
  env: PayPalServerConfigEnv;
  sdkUrl: string;
};

export type PayPalCreateOrderStatus =
  | "CREATED"
  | "SAVED"
  | "APPROVED"
  | "PAYER_ACTION_REQUIRED"
  | "VOIDED"
  | "COMPLETED";

export type PayPalCreateOrderResponse = {
  id: string;
  shopOrderId: string;
  status: PayPalCreateOrderStatus;
};
