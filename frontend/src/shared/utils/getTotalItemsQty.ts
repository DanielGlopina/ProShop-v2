import type { CartArrayItem } from "@/features/cart/types";

export const getTotalItemsQty = (cartItems: CartArrayItem[]) => {
  return cartItems.reduce((acc, curr) => {
    return acc + curr.qty;
  }, 0);
};
