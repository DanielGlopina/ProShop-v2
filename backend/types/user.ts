export interface User {
  name: string;
  email: string;
  password: string;
  isAdmin: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface UserResponse {
  id: string;
  name: string;
  email: string;
  isAdmin: boolean;
}

export interface UserJwtPayload {
  id: string;
  email: string;
  isAdmin: boolean;
}
