import assert from "node:assert/strict";
import test from "node:test";

import { resolvePayPalOrderId } from "./paypal.ts";

test("returns PayPal order id from successful create response", () => {
  assert.equal(
    resolvePayPalOrderId({ id: "PAYPAL_ORDER_123" }),
    "PAYPAL_ORDER_123",
  );
});

test("throws when PayPal order id is missing or invalid", () => {
  assert.throws(
    () => resolvePayPalOrderId(undefined),
    /PayPal order ID is invalid/i,
  );
  assert.throws(
    () => resolvePayPalOrderId({ id: 123 as unknown as string }),
    /PayPal order ID is invalid/i,
  );
});
