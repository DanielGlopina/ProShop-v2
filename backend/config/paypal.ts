import {
  Client,
  Environment,
  OrdersController,
} from "@paypal/paypal-server-sdk";

export const paypal = () => {
  const paypalSettings = {
    clientId: process.env.PAYPAL_CLIENT_ID,
    clientSecret: process.env.PAYPAL_CLIENT_SECRET,
    env: process.env.PAYPAL_ENV as "sandbox" | "live",
  };

  const ordersController = new OrdersController(
    new Client({
      clientCredentialsAuthCredentials: {
        oAuthClientId: process.env.PAYPAL_CLIENT_ID!,
        oAuthClientSecret: process.env.PAYPAL_CLIENT_SECRET!,
      },
      environment:
        process.env.PAYPAL_ENV === "live"
          ? Environment.Production
          : Environment.Sandbox,
    }),
  );

  return { paypalSettings, ordersController };
};
