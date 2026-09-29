import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type {
  CartItem,
  CartItemActionPayload,
  ShippingAddress,
  PaymentMethod,
} from "../types";

export type CartState = {
  cartItems: Record<string, CartItem>;
  shippingAddress: ShippingAddress;
  paymentMethod: PaymentMethod;
};

const initialCartState: CartState = {
  cartItems: JSON.parse(localStorage.getItem("cart") as string) ?? {},
  shippingAddress: {
    address: "",
    city: "",
    postalCode: "",
    country: "",
  },
  paymentMethod: "PayPal",
};

export const cartSlice = createSlice({
  name: "cart",
  initialState: initialCartState,
  selectors: {
    selectCartItems: (state) => state.cartItems,
    selectCartItem: (state, _id: string) => state.cartItems[_id],
    selectShippingAddress: (state) => state.shippingAddress,
  },
  reducers: {
    addToCart: (state, action: PayloadAction<CartItemActionPayload>) => {
      const { _id, ...params } = action.payload;
      const exists = state.cartItems[_id];
      const currentQty = exists ? state.cartItems[_id].qty + 1 : 1;

      if (exists && currentQty > state.cartItems[_id].countInStock) {
        return;
      }

      state.cartItems[_id] = { ...params, qty: currentQty };

      localStorage.setItem("cart", JSON.stringify(state.cartItems));
    },
    increaseItemQty: (state, action: PayloadAction<{ _id: string }>) => {
      const { _id } = action.payload;
      const currentQty = state.cartItems[_id].qty;

      if (currentQty > state.cartItems[_id].countInStock) {
        return;
      }

      state.cartItems[_id].qty++;

      localStorage.setItem("cart", JSON.stringify(state.cartItems));
    },
    reduceItemQty: (state, action: PayloadAction<{ _id: string }>) => {
      const { _id } = action.payload;
      const currentQty = state.cartItems[_id].qty;

      if (currentQty > 1) {
        state.cartItems[_id].qty = currentQty - 1;
      } else {
        delete state.cartItems[_id];
      }

      localStorage.setItem("cart", JSON.stringify(state.cartItems));
    },
    saveShippingAddress: (
      state,
      action: PayloadAction<{
        address: string;
        city: string;
        postalCode: string;
        country: string;
      }>,
    ) => {
      const shippingAddress = action.payload;

      state.shippingAddress = {
        ...shippingAddress,
      };
    },
    savePaymentMethod: (
      state,
      action: PayloadAction<{
        paymentMethod: PaymentMethod;
      }>,
    ) => {
      state.paymentMethod = action.payload.paymentMethod;
    },
  },
});
