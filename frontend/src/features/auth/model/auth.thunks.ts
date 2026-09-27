import { createAsyncThunk } from "@reduxjs/toolkit";
import axios, { isAxiosError } from "axios";
import { login, logout, registration } from "../api";
import { getServerError, type ServerError } from "@/shared/api-error";

import { store } from "@/app/store";
import { authSlice } from "./auth.slice";
import type { AuthResponse } from "../types";
import { baseUrl } from "@/shared/api";

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
    store.dispatch(authSlice.actions.setLoading({ bool: true }));
    const { data } = await login(email, password);
    return data;
  } catch (error) {
    return rejectWithValue(getServerError(error, "Unable to login."));
  } finally {
    store.dispatch(authSlice.actions.setLoading({ bool: false }));
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
      store.dispatch(authSlice.actions.setLoading({ bool: true }));
      const { data } = await registration(name, email, password);
      return data;
    } catch (error) {
      return rejectWithValue(getServerError(error, "Unable to login."));
    } finally {
      store.dispatch(authSlice.actions.setLoading({ bool: false }));
    }
  },
);

export const logoutThunk = createAsyncThunk<
  void,
  void,
  { rejectValue: { message: string } }
>("auth/logout", async (_, { rejectWithValue }) => {
  try {
    store.dispatch(authSlice.actions.setLoading({ bool: true }));
    await logout();
  } catch (error) {
    const message = isAxiosError<{ message?: string }>(error)
      ? (error.response?.data?.message ?? "Unable to register.")
      : "Something went wrong.";

    return rejectWithValue({ message });
  } finally {
    store.dispatch(authSlice.actions.setLoading({ bool: false }));
  }
});

export const checkAuthThunk = createAsyncThunk(
  "auth/check",
  async (_, { rejectWithValue }) => {
    try {
      store.dispatch(authSlice.actions.setLoading({ bool: true }));
      const { data } = await axios.get<AuthResponse>(`${baseUrl}/refresh`, {
        withCredentials: true,
      });

      return data;
    } catch (error) {
      const message = isAxiosError<{ message?: string }>(error)
        ? (error.response?.data?.message ?? "Unable to register.")
        : "Something went wrong.";

      return rejectWithValue({ message });
    } finally {
      store.dispatch(authSlice.actions.setLoading({ bool: false }));
    }
  },
);
