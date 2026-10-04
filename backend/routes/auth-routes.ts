import express from "express";
import {
  registration,
  login,
  logout,
  refresh,
  getUsers,
} from "../controllers/user-controller.js";
import {
  loginValidator,
  registerValidator,
} from "../validators/auth-validator.js";
import { validateHandler } from "../middlewares/validate-handler.js";
import { authHandler } from "../middlewares/auth-handler.js";

const router = express.Router();

// @route   POST api/registration
// @desc    Registrate new user
// @access  Public
router.post("/registration", registerValidator, validateHandler, registration);

// @route   POST api/login
// @desc    Login with an existing user
// @access  Public
router.post("/login", loginValidator, validateHandler, login);

// @route   POST api/logout
// @desc    Logout from account
// @access  Public
router.post("/logout", logout);

// @route   GET api/refresh
// @desc    Refresh access token
// @access  Public
router.get("/refresh", refresh);

router.get("/users", authHandler, getUsers);

export default router;
