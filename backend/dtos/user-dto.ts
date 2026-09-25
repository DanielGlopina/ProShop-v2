import type { UserResponse } from "../types/user.js";

type UserDtoSource = {
  _id: { toString(): string };
  name: string;
  email: string;
  isAdmin: boolean;
};

export function toUserDto(model: UserDtoSource): UserResponse {
  return {
    id: model._id.toString(),
    name: model.name,
    email: model.email,
    isAdmin: model.isAdmin,
  };
}
