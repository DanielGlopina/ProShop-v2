import type { ErrorRequestHandler, RequestHandler } from "express";
import { HttpError, NotFoundError } from "../errors/http-error.js";

interface ErrorResponse {
  error: {
    message: string;
    details?: unknown;
    stack?: string;
  };
}

export const notFoundHandler: RequestHandler = (req, _res, next) => {
  next(new NotFoundError(`Route ${req.method} ${req.originalUrl} not found`));
};

export const errorHandler: ErrorRequestHandler = (err, req, res, next) => {
  // Если ответ уже начал отправляться, отдаём ошибку встроенному обработчику Express
  if (res.headersSent) {
    return next(err);
  }

  let status = 500;
  let message = "Internal Server Error";
  let details: unknown;

  if (err instanceof HttpError) {
    status = err.status;
    message = err.message;
    details = err.details;
  } else if (err instanceof SyntaxError && "body" in err) {
    // Невалидный JSON в теле запроса (от express.json())
    status = 400;
    message = "Invalid JSON";
  } else if (
    typeof err?.status === "number" &&
    err.status >= 400 &&
    err.status < 500
  ) {
    // Ошибки других библиотек (body-parser и т.п.), у которых есть status
    status = err.status;
    message = err.message;
  }

  // Неожиданные ошибки (5xx) логируем, клиентские (4xx) обычно не нужно
  if (status >= 500) {
    console.error(`[${req.method}] ${req.originalUrl}`, err);
  }

  const body: ErrorResponse = { error: { message } };
  if (details !== undefined) body.error.details = details;
  if (process.env.NODE_ENV !== "production" && err instanceof Error) {
    body.error.stack = err.stack;
  }

  res.status(status).json(body);
};
