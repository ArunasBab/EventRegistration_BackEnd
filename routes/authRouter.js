import express from "express";
import { registerUser } from "../controllers/authController.js";
import { registerUserValidation } from "../middleware/registerUserValidation.js";

const router = express.Router();

router.post("/register", registerUserValidation, registerUser);

router.post("/login", () => {});

router.post("/logout", () => {});

export default router;
