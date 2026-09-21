import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const baseUrl = import.meta.env.VITE_URL_BASE;

export const baseApi = createApi({
  baseQuery: fetchBaseQuery({ baseUrl }),
  tagTypes: ["Products"],
  endpoints: () => ({}),
});
