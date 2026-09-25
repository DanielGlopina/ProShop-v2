import express from "express";
import {
  registration,
  login,
  logout,
  refresh,
  getUsers,
} from "../controllers/user-controller.js";
import { registerValidator } from "../validators/auth-validator.js";
import { validateHandler } from "../middlewares/validate-handler.js";
import { authHandler } from "../middlewares/auth-handler.js";

const router = express.Router();

router.post("/registration", registerValidator, validateHandler, registration);
router.post("/login", login);
router.post("/logout", logout);
router.get("/refresh", refresh);
router.get("/users", authHandler, getUsers);

export default router;
