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

export const refreshAccessToken = async (): Promise<string> => {
  const { data } = await axios.get<AuthResponse>(`${baseUrl}/refresh`, {
    withCredentials: true,
  });

  localStorage.setItem("token", data.accessToken);
  return data.accessToken;
};

//=== Interceptors ===
axiosApi.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  } else {
    delete config.headers.Authorization;
  }

  return config;
});

axiosApi.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (!error.response || error.response.status !== 401 || !originalRequest) {
      return Promise.reject(error);
    }

    if (originalRequest._retry) {
      return Promise.reject(error);
    }

    originalRequest._retry = true;

    try {
      const accessToken = await refreshAccessToken();
      originalRequest.headers.Authorization = `Bearer ${accessToken}`;
      return axiosApi(originalRequest);
    } catch (refreshError) {
      localStorage.removeItem("token");
      return Promise.reject(refreshError);
    }
  },
);

export default axiosApi;
