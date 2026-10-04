export type PayPalOrderCreateResponseLike = {
  id?: unknown;
};

export function resolvePayPalOrderId(
  response: PayPalOrderCreateResponseLike | undefined,
): string {
  const orderId = response?.id;

  if (typeof orderId !== "string" || orderId.trim().length === 0) {
    throw new Error("PayPal order ID is invalid");
  }

  return orderId;
}
