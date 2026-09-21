export type CartItem = {
  name: string;
  image: string;
  price: number;
  countInStock: number;
  qty: number;
};

export type CartItemActionPayload = Omit<CartItem, "qty"> & { _id: string };

export type ShippingAddress = {
  address?: string;
  city?: string;
  postalCode?: string;
  country?: string;
};
