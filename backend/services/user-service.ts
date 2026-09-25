import User from "../models/user-model.js";
import {
  BadRequestError,
  ConflictError,
  NotFoundError,
  UnauthorizedError,
} from "../errors/http-error.js";
import bcrypt from "bcryptjs";
import {
  generateTokens,
  findToken,
  saveToken,
  removeToken,
  validateRefreshToken,
} from "./token-service.js";
import { toUserDto } from "../dtos/user-dto.js";
import type { UserResponse } from "../types/user.js";

export const registrationService = async (
  name: string,
  email: string,
  password: string,
) => {
  const candidate = await User.findOne({ email });

  if (candidate) {
    throw new ConflictError("User with this email adress already exists");
  }

  const hashPassword = await bcrypt.hash(password, 10);
  const user = await User.create({ name, email, password: hashPassword });

  const userDto = toUserDto({
    isAdmin: user.isAdmin,
    name: user.name,
    email: user.email,
    _id: String(user._id),
  });

  const tokens = generateTokens({ ...userDto, isAdmin: false });

  await saveToken(userDto.id, tokens.refreshToken);

  return {
    ...tokens,
    user: userDto,
  };
};

export const loginService = async (email: string, password: string) => {
  const user = await User.findOne({ email });

  if (!user) {
    throw new BadRequestError("User with this email adress is not found");
  }

  const isPassEquals = await bcrypt.compare(password, user.password);

  if (!isPassEquals) {
    throw new BadRequestError("Incorrect password");
  }

  const userDto = toUserDto({
    isAdmin: user.isAdmin,
    name: user.name,
    email: user.email,
    _id: String(user._id),
  });

  const tokens = generateTokens({ ...userDto, isAdmin: false });

  await saveToken(userDto.id, tokens.refreshToken);

  return {
    ...tokens,
    user: userDto,
  };
};

export const logoutService = async (refreshToken: string) => {
  const token = await removeToken(refreshToken);

  return token;
};

export const refreshService = async (refreshToken: string) => {
  if (!refreshToken) {
    throw new UnauthorizedError("User is not authorized");
  }
  const userData = validateRefreshToken(refreshToken);
  const tokenFromDb = await findToken(refreshToken);

  if (!userData || !tokenFromDb) {
    throw new UnauthorizedError();
  }

  const user = await User.findById(userData.id);

  if (!user) {
    throw new NotFoundError();
  }

  const userDto = toUserDto({
    isAdmin: user.isAdmin,
    name: user.name,
    email: user.email,
    _id: String(user._id),
  });

  const tokens = generateTokens({ ...userDto, isAdmin: false });
  await saveToken(userDto.id, tokens.refreshToken);

  return {
    ...tokens,
    user: userDto,
  };
};

//=== For protected route ===
export const getAllUsersService = async (): Promise<UserResponse[]> => {
  const users = await User.find().select("name email isAdmin");

  return users.map((user) =>
    toUserDto({
      isAdmin: user.isAdmin,
      name: user.name,
      email: user.email,
      _id: String(user._id),
    }),
  );
};
