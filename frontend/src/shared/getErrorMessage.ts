import type { SerializedError } from "@reduxjs/toolkit";
import type { FetchBaseQueryError } from "@reduxjs/toolkit/query";

const STATUS_TEXT: Record<number, string> = {
  400: "Bad Request",
  401: "Unauthorized",
  403: "Forbidden",
  404: "Not Found",
  500: "Internal Server Error",
};

export const getErrorMessage = (
  error: FetchBaseQueryError | SerializedError | undefined,
): string => {
  if (!error) return "";

  if ("status" in error) {
    const data = error.data as { message?: string } | undefined;
    if (data?.message) return data.message;

    const code =
      typeof error.status === "number"
        ? error.status
        : "originalStatus" in error
          ? error.originalStatus
          : undefined;

    if (code) return `${code} (${STATUS_TEXT[code] ?? "Error"})`;
    if ("error" in error) return error.error;
  }

  return (error as SerializedError).message ?? "Неизвестная ошибка";
};
