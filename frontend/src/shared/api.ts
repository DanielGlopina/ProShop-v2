import axios from "axios";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

import type { AuthResponse } from "@/features/auth/types";

export const baseUrl = import.meta.env.VITE_URL_BASE;

const axiosApi = axios.create({
  withCredentials: true,
  baseURL: baseUrl,
});

export const baseApi = createApi({
  baseQuery: fetchBaseQuery({ baseUrl }),
  tagTypes: ["Products"],
  endpoints: () => ({}),
});

//=== Interceptors ===
axiosApi.interceptors.request.use((config) => {
  config.headers.Authorization = `Bearer ${localStorage.getItem("token")}`;
  return config;
});

axiosApi.interceptors.response.use(
  (config) => {
    return config;
  },
  async (error) => {
    const originalRequest = error.config;
    if (error.response.status === 401) {
      try {
        const { data } = await axios.get<AuthResponse>(`${baseUrl}/refresh`, {
          withCredentials: true,
        });
        localStorage.setItem("token", data.accessToken);
        return axiosApi(originalRequest);
      } catch {
        console.log("Not authorized");
      }
    }
  },
);

export default axiosApi;
