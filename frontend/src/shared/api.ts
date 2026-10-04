import axios from "axios";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

import { sessionExpired } from "@/features/auth/model/session-actions";
import type { AuthResponse } from "@/features/auth/types";

export const baseUrl = import.meta.env.VITE_URL_BASE;

const axiosApi = axios.create({
  withCredentials: true,
  baseURL: baseUrl,
});

let refreshPromise: Promise<string> | null = null;

export const refreshAccessToken = (): Promise<string> => {
  if (!refreshPromise) {
    refreshPromise = axios
      .get<AuthResponse>(`${baseUrl}/refresh`, { withCredentials: true })
      .then(({ data }) => {
        localStorage.setItem("token", data.accessToken);
        return data.accessToken;
      })
      .finally(() => {
        refreshPromise = null;
      });
  }

  return refreshPromise;
};

const rawBaseQuery = fetchBaseQuery({
  baseUrl,
  credentials: "include",
  prepareHeaders: (headers) => {
    const token = localStorage.getItem("token");
    if (token) headers.set("Authorization", `Bearer ${token}`);
    else headers.delete("Authorization");
    return headers;
  },
});

const baseQueryWithReauth: typeof rawBaseQuery = async (
  args,
  api,
  extraOptions,
) => {
  let result = await rawBaseQuery(args, api, extraOptions);

  if (result.error?.status === 401) {
    try {
      await refreshAccessToken();
      result = await rawBaseQuery(args, api, extraOptions);
    } catch {
      localStorage.removeItem("token");
      api.dispatch(sessionExpired());
    }
  }

  return result;
};

export const baseApi = createApi({
  baseQuery: baseQueryWithReauth,
  tagTypes: ["Products", "Orders"],
  endpoints: () => ({}),
});

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


