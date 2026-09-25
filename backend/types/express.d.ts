import type { UserJwtPayload } from "./user.js";

declare global {
  namespace Express {
    interface Request {
      user?: UserJwtPayload;
    }
  }
}

export {};
