import express from "express";
import {
  loginUser,
  logoutUser,
  registerUser,
} from "../controllers/authController.js";
import { registerUserValidation } from "../middleware/registerUserValidation.js";
import { loginUserValidation } from "../middleware/loginUserValidation.js";

const router = express.Router();

router.post("/register", registerUserValidation, registerUser);

router.post("/login", loginUserValidation, loginUser);

router.post("/logout", logoutUser);

export default router;
