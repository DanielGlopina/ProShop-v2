import jwt from "jsonwebtoken";
import Token from "../models/token-model.js";
import type { UserJwtPayload } from "../types/user.js";

export const generateTokens = (payload: UserJwtPayload) => {
  const accessToken = jwt.sign(
    payload,
    process.env.JWT_ACCESS_SECRET as string,
    { expiresIn: "30s" },
  );
  const refreshToken = jwt.sign(
    payload,
    process.env.JWT_REFRESH_SECRET as string,
    { expiresIn: "30d" },
  );

  return {
    accessToken,
    refreshToken,
  };
};

export const saveToken = async (userId: string, refreshToken: string) => {
  const tokenData = await Token.findOne({ user: userId });
  if (tokenData) {
    tokenData.refreshToken = refreshToken;
    return tokenData.save();
  }
  const token = await Token.create({ user: userId, refreshToken });
  return token;
};

export const removeToken = async (refreshToken: string) => {
  const tokenData = await Token.deleteOne({ refreshToken });
  return tokenData;
};

export const findToken = async (refreshToken: string) => {
  const tokenData = await Token.findOne({ refreshToken });
  return tokenData;
};

export const validateAccessToken = (token: string): UserJwtPayload => {
  const userData = jwt.verify(
    token,
    process.env.JWT_ACCESS_SECRET as string,
  ) as { id: string; email: string; isAdmin: boolean };
  return userData;
};

export const validateRefreshToken = (token: string): UserJwtPayload => {
  return jwt.verify(
    token,
    process.env.JWT_REFRESH_SECRET as string,
  ) as UserJwtPayload;
};
