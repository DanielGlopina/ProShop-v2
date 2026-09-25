import type { RequestHandler } from "express";
import { UnauthorizedError } from "../errors/http-error.js";
import { validateAccessToken } from "../services/token-service.js";

export const authHandler: RequestHandler = (req, _res, next) => {
  try {
    const accessToken = req.headers.authorization?.split(" ")[1];

    if (!accessToken) {
      return next(new UnauthorizedError());
    }

    const userData = validateAccessToken(accessToken);

    if (!userData) {
      return next(new UnauthorizedError());
    }

    req.user = userData;
    next();
  } catch {
    next(new UnauthorizedError());
  }
};
