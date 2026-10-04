import type { RequestHandler } from "express";
import { validateAccessToken } from "../services/token-service.js";

export const orderAuthHandler: RequestHandler = (req, _res, next) => {
  const [scheme, token] = req.headers.authorization?.split(" ") ?? [];

  if (scheme === "Bearer" && token) {
    try {
      const userData = validateAccessToken(token);

      if (userData) {
        req.user = userData;
      }
    } catch {
      //=== Invalid token: place order as an guest ===
    }
  }

  next();
};
