import UserModel from "../models/userModel.js";
import bcrypt from "bcryptjs";

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
