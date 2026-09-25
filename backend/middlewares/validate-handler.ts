import type { RequestHandler } from "express";
import { validationResult } from "express-validator";
import { BadRequestError } from "../errors/http-error.js";

export const validateHandler: RequestHandler = (req, _res, next) => {
  const result = validationResult(req);

  if (!result.isEmpty()) {
    return next(new BadRequestError("Validation failed", result.array()));
  }

  next();
};
