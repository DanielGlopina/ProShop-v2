import "dotenv/config";
import express, { Request, Response } from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import connectDB from "./config/db.js";
import authRoutes from "./routes/auth-routes.js";
import productRoutes from "./routes/product-routes.js";
import orderRoutes from "./routes/order-routes.js";
import { errorHandler, notFoundHandler } from "./middlewares/error-handler.js";
import { paypal } from "./config/paypal.js";

connectDB();
const { paypalSettings } = paypal();
const app = express();

app.use(
  cors({
    origin: process.env.CLIENT_URL,
    credentials: true,
  }),
);
app.use(express.json());
app.use(cookieParser());

const port = process.env.PORT || 5000;

app.get("/", (req: Request, res: Response) => {
  res.json("Server is Live!");
});

app.use("/api", authRoutes);
app.use("/api/products", productRoutes);
app.use("/api/orders", orderRoutes);

app.get("/api/paypal/config", (_req, res) => {
  res.json({
    clientId: paypalSettings.clientId,
    env: paypalSettings.env,
    sdkUrl:
      paypalSettings.env === "live"
        ? "https://www.paypal.com/web-sdk/v6/core"
        : "https://www.sandbox.paypal.com/web-sdk/v6/core",
  });
});

app.use(notFoundHandler);
app.use(errorHandler);

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
