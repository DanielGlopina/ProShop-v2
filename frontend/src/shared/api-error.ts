import { isAxiosError } from "axios";

export type ServerError = {
  message: string;
  fields?: Record<string, string>;
};

type ValidationDetail = {
  type: string;
  value: unknown;
  msg: string;
  path: string;
  location: "body" | "query" | "params";
};

type ServerErrorResponse = {
  error: {
    message: string;
    details?: ValidationDetail[];
  };
};

export const getServerError = (
  error: unknown,
  fallback: string,
): ServerError => {
  if (!isAxiosError<ServerErrorResponse>(error)) {
    return { message: fallback };
  }

  const serverError = error.response?.data.error;

  if (!serverError) {
    return { message: fallback };
  }

  const fields = Object.fromEntries(
    (serverError.details ?? [])
      .filter((detail) => detail.location === "body")
      .map((detail) => [detail.path, detail.msg]),
  );

  return {
    message: serverError.message,
    ...(Object.keys(fields).length > 0 ? { fields } : {}),
  };
};
