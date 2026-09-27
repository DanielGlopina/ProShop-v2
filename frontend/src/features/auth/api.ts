import axiosApi from "@/shared/api";
import { type AxiosResponse } from "axios";
import type { AuthResponse, User } from "./types";

export const login = async (
  email: string,
  password: string,
): Promise<AxiosResponse<AuthResponse>> => {
  return axiosApi.post<AuthResponse>("/login", { email, password });
};

export const registration = async (
  name: string,
  email: string,
  password: string,
): Promise<AxiosResponse<AuthResponse>> => {
  return axiosApi.post<AuthResponse>("/registration", {
    name,
    email,
    password,
  });
};

export const logout = async (): Promise<void> => {
  return axiosApi.post("/logout");
};

//=== EXAMPLE: REQUEST TO PROTECTED ROUTE ===
export const fetchUsers = async (): Promise<AxiosResponse<User[]>> => {
  return axiosApi.post<User[]>("/users");
};
