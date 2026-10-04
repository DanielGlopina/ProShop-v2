import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import {
  loginThunk,
  registrationThunk,
  logoutThunk,
  checkAuthThunk,
} from "./auth.thunks";
import type { User } from "../types";
import { sessionExpired } from "./session-actions";

export type AuthState = {
  user: User;
  isAuth: boolean;
  isInitialized: boolean;
  isLoading: boolean;
};

const initialAuthState: AuthState = {
  user: {} as User,
  isAuth: false,
  isInitialized: false,
  isLoading: false,
};

export const authSlice = createSlice({
  name: "auth",
  initialState: initialAuthState,
  selectors: {
    selectIsAuth: (state) => state.isAuth,
    selectUser: (state) => state.user,
    selectLoadingStatus: (state) => state.isLoading,
    selectIsInitialized: (state) => state.isInitialized,
    selectIsAdmin: (state) => state.user.isAdmin,
  },
  reducers: {
    setLoading: (state, action: PayloadAction<{ bool: boolean }>) => {
      state.isLoading = action.payload.bool;
    },
    setInitialized: (state, action: PayloadAction<boolean>) => {
      state.isInitialized = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(sessionExpired, (state) => {
      state.isAuth = false;
      state.user = {} as User;
      state.isLoading = false;
      state.isInitialized = true;
    });
    //=== Login ===
    builder
      .addCase(loginThunk.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(loginThunk.fulfilled, (state, action) => {
        const { user, accessToken } = action.payload;

        localStorage.setItem("token", accessToken);
        state.isAuth = true;
        state.user = user;
        state.isLoading = false;
      })
      .addCase(loginThunk.rejected, (state) => {
        state.isLoading = false;
      });

    //=== Registration ===
    builder
      .addCase(registrationThunk.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(registrationThunk.fulfilled, (state, action) => {
        const { user, accessToken } = action.payload;

        localStorage.setItem("token", accessToken);
        state.isAuth = true;
        state.user = user;

        state.isLoading = false;
      })
      .addCase(registrationThunk.rejected, (state) => {
        state.isLoading = false;
      });

    //=== Logout ===
    builder
      .addCase(logoutThunk.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(logoutThunk.fulfilled, (state) => {
        localStorage.removeItem("token");
        state.isAuth = false;
        state.user = {} as User;

        state.isLoading = false;
      })
      .addCase(logoutThunk.rejected, (state) => {
        state.isLoading = false;
      });

    //=== Check Auth ===
    builder
      .addCase(checkAuthThunk.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(checkAuthThunk.fulfilled, (state, action) => {
        const { accessToken, user } = action.payload;

        localStorage.setItem("token", accessToken);
        state.user = user;
        state.isAuth = true;
        state.isInitialized = true;
        state.isLoading = false;
      })
      .addCase(checkAuthThunk.rejected, (state) => {
        localStorage.removeItem("token");
        state.user = {} as User;
        state.isAuth = false;
        state.isInitialized = true;
        state.isLoading = false;
      });
  },
});
