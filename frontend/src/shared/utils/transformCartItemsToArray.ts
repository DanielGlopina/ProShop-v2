import type { CartItem, CartArrayItem } from "@/features/cart/types";

export const transformCartItemsToArray = (
  cartItems: Record<string, CartItem>,
) => {
  const cartItemsEntries = Object.entries(cartItems);
  const cartItemsArr: CartArrayItem[] = [];

  cartItemsEntries.forEach((entrie) => {
    const productId = entrie[0];
    const itemValues = entrie[1];
    cartItemsArr.push({
      name: itemValues.name,
      qty: itemValues.qty,
      image: itemValues.image,
      price: itemValues.price,
      _id: productId,
    });
  });

  return cartItemsArr;
};
