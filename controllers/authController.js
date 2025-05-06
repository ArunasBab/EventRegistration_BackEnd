import UserModel from "../models/userModel.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

const { JWT_SECRET } = process.env;

export async function registerUser(req, res) {
  const body = req.body;

  try {
    const hashedPassword = await bcrypt.hash(body.password, 10);

    const newUser = new UserModel({
      ...body,
      password: hashedPassword,
    });

    // Tikrina ar email'as jau egzistuoja
    const existingUser = await UserModel.findOne({ email: body.email });
    if (existingUser) {
      return res.status(400).json({
        error: "User with email already exists",
      });
    }

    await newUser.save();

    res.status(201).json(newUser);
  } catch (error) {
    res.status(500).json({
      error: error.message,
    });
  }
}

export async function loginUser(req, res) {
  const { email, password } = req.body;

  try {
    const user = await UserModel.findOne({ email });

    if (!user) {
      return res.status(400).json({
        error: "User with email does not exist",
      });
    }

    const isPasswordCorrect = await bcrypt.compare(password, user.password);

    if (isPasswordCorrect) {
      const token = jwt.sign({ id: user._id, email: user.email }, JWT_SECRET, {
        expiresIn: "1h",
      });

      return res.json({
        token,
        user,
      });
    } else {
      res.status(400).json({
        error: "Invalid password",
      });
    }
  } catch (error) {
    res.status(500).json({
      error: error.message,
    });
  }
}
