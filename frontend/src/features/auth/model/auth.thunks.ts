import { createAsyncThunk } from "@reduxjs/toolkit";
import { isAxiosError } from "axios";
import { login, logout, registration } from "../api";
import { getServerError, type ServerError } from "@/shared/api-error";

import type { AuthResponse } from "../types";
import axiosApi from "@/shared/api";

type LoginPayload = {
  email: string;
  password: string;
};

type RegistrationPayload = LoginPayload & { name: string };

export const loginThunk = createAsyncThunk<
  AuthResponse,
  LoginPayload,
  { rejectValue: ServerError }
>("auth/login", async ({ email, password }, { rejectWithValue }) => {
  try {
    const { data } = await login(email, password);
    return data;
  } catch (error) {
    return rejectWithValue(getServerError(error, "Unable to login."));
  }
});

export const registrationThunk = createAsyncThunk<
  AuthResponse,
  RegistrationPayload,
  { rejectValue: ServerError }
>(
  "auth/registration",
  async ({ name, email, password }, { rejectWithValue }) => {
    try {
      const { data } = await registration(name, email, password);
      return data;
    } catch (error) {
      return rejectWithValue(getServerError(error, "Unable to login."));
    }
  },
);

export const logoutThunk = createAsyncThunk<
  void,
  void,
  { rejectValue: { message: string } }
>("auth/logout", async (_, { rejectWithValue }) => {
  try {
    await logout();
  } catch (error) {
    const message = isAxiosError<{ message?: string }>(error)
      ? (error.response?.data?.message ?? "Unable to register.")
      : "Something went wrong.";

    return rejectWithValue({ message });
  }
});

export const checkAuthThunk = createAsyncThunk(
  "auth/check",
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await axiosApi.get<AuthResponse>("/refresh");

      return data;
    } catch (error) {
      const message = isAxiosError<{ message?: string }>(error)
        ? (error.response?.data?.message ?? "Unable to register.")
        : "Something went wrong.";

      return rejectWithValue({ message });
    }
  },
);
