import type { RequestHandler } from "express";
import { ForbiddenError, UnauthorizedError } from "../errors/http-error.js";

export const adminHandler: RequestHandler = (req, _res, next) => {
  if (!req.user) {
    return next(new UnauthorizedError());
  }

  if (!req.user.isAdmin) {
    return next(new ForbiddenError("Admin access required"));
  }

  next();
};
