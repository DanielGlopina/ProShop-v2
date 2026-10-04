export type CartItem = {
  name: string;
  image: string;
  price: number;
  countInStock: number;
  qty: number;
};

export type CartArrayItem = Omit<CartItem, "countInStock"> & {
  _id: string;
};

export type CartItemActionPayload = Omit<CartItem, "qty"> & { _id: string };

export type ShippingAddress = {
  address: string;
  city: string;
  postalCode: string;
  country: string;
};

export type Contacts = {
  name: string;
  email: string;
  phoneNumber: string;
};

export type PaymentMethod = "PayPal" | "Stripe" | "COD";
