import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import {
  loginThunk,
  registrationThunk,
  logoutThunk,
  checkAuthThunk,
} from "./auth.thunks";
import type { User } from "../types";

export type AuthState = {
  user: User;
  isAuth: boolean;
  isLoading: boolean;
};

const initialAuthState: AuthState = {
  user: {} as User,
  isAuth: false,
  isLoading: false,
};

export const authSlice = createSlice({
  name: "auth",
  initialState: initialAuthState,
  selectors: {
    selectIsAuth: (state) => state.isAuth,
    selectUser: (state) => state.user,
    selectLoadingStatus: (state) => state.isLoading,
  },
  reducers: {
    setLoading: (state, action: PayloadAction<{ bool: boolean }>) => {
      state.isLoading = action.payload.bool;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(loginThunk.fulfilled, (state, action) => {
      const { user, accessToken } = action.payload;

      localStorage.setItem("token", accessToken);
      state.isAuth = true;
      state.user = user;
    });

    builder.addCase(registrationThunk.fulfilled, (state, action) => {
      const { user, accessToken } = action.payload;

      localStorage.setItem("token", accessToken);
      state.isAuth = true;
      state.user = user;
    });

    builder.addCase(logoutThunk.fulfilled, (state) => {
      localStorage.removeItem("token");
      state.isAuth = false;
      state.user = {} as User;
    });

    builder.addCase(checkAuthThunk.fulfilled, (state, action) => {
      const { accessToken, user } = action.payload;

      localStorage.setItem("token", accessToken);
      state.isAuth = true;
      state.user = user;
    });
  },
});
