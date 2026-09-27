export type AuthResponse = {
  accessToken: string;
  refreshToken: string;
  user: User;
};

export type User = {
  name: string;
  email: string;
  isAdmin: boolean;
};
