import test from "node:test";
import assert from "node:assert/strict";

import { validatePaypalCapture } from "../services/paypal-order-service.js";

test("validatePaypalCapture rejects mismatched captured total", () => {
  assert.throws(
    () =>
      validatePaypalCapture({
        orderTotal: 100,
        paypalOrder: { status: "COMPLETED" },
        capture: { amount: { value: "99.99" } },
      }),
    /Captured amount does not match the shop order total/,
  );
});

test("validatePaypalCapture accepts matching captured total", () => {
  assert.doesNotThrow(() =>
    validatePaypalCapture({
      orderTotal: 100,
      paypalOrder: { status: "COMPLETED" },
      capture: { amount: { value: "100.00" } },
    }),
  );
});
