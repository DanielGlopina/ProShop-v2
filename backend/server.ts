import "dotenv/config";
import express, { Request, Response } from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import connectDB from "./config/db.js";
import authRoutes from "./routes/auth-routes.js";
import productRoutes from "./routes/product-routes.js";
import { errorHandler, notFoundHandler } from "./middlewares/error-handler.js";

connectDB();

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

app.use(notFoundHandler);
app.use(errorHandler);

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
