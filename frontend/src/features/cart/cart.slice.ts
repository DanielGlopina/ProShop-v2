import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { CartItem, CartItemActionPayload } from "./types";

export type CartState = {
  cartItems: Record<string, CartItem>;
};

const initialCartState: CartState = {
  cartItems: JSON.parse(localStorage.getItem("cart") as string) ?? {},
};

export const cartSlice = createSlice({
  name: "cart",
  initialState: initialCartState,
  selectors: {
    selectCartItems: (state) => state.cartItems,
    selectCartItem: (state, _id: string) => state.cartItems[_id],
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
    increaseItemQty: (state, action: PayloadAction<{_id: string}> ) => {
      const {_id} = action.payload;
        const currentQty = state.cartItems[_id].qty;

      if (currentQty > state.cartItems[_id].countInStock) {
        return;
      }
      
      state.cartItems[_id].qty++;

      localStorage.setItem("cart", JSON.stringify(state.cartItems));
    },
    reduceItemQty: (state, action: PayloadAction<{_id: string}>) => {
      const {_id} = action.payload;
      const currentQty = state.cartItems[_id].qty;

      if(currentQty > 1){
        state.cartItems[_id].qty = currentQty - 1;
      }
      else{
        delete state.cartItems[_id];
      }

      localStorage.setItem("cart", JSON.stringify(state.cartItems));
    }
  },
});
