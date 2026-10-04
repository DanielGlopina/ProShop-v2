import type { CartArrayItem } from "@/features/cart/types";

export const getCartTotals = (cartItems: CartArrayItem[]) => {
  return cartItems.reduce((acc, curr) => {
    return acc + curr.price * curr.qty;
  }, 0);
};
