import { asyncHandler } from "../middlewares/async-handler.js";
import {
  loginService,
  registrationService,
  logoutService,
  getAllUsersService,
  refreshService,
} from "../services/user-service.js";

export const registration = asyncHandler(async (req, res, next) => {
  const { name, email, password } = req.body;

  const userData = await registrationService(name, email, password);

  res.cookie("refreshToken", userData.refreshToken, {
    maxAge: 30 * 24 * 60 * 60 * 1000,
    httpOnly: true,
  });

  return res.json(userData);
});

export const login = asyncHandler(async (req, res, next) => {
  const { email, password } = req.body;
  const userData = await loginService(email, password);

  res.cookie("refreshToken", userData.refreshToken, {
    maxAge: 30 * 24 * 60 * 60 * 1000,
    httpOnly: true,
  });

  return res.json(userData);
});

export const logout = asyncHandler(async (req, res, next) => {
  const { refreshToken } = req.cookies;
  const token = await logoutService(refreshToken);
  res.clearCookie("refreshToken");
  return res.json(token);
});

export const refresh = asyncHandler(async (req, res, next) => {
  const { refreshToken } = req.cookies;

  const userData = await refreshService(refreshToken);

  res.cookie("refreshToken", userData.refreshToken, {
    maxAge: 30 * 24 * 60 * 60 * 1000,
    httpOnly: true,
  });

  return res.json(userData);
});

export const getUsers = asyncHandler(async (req, res, next) => {
  const users = await getAllUsersService();
  return res.json(users);
});
