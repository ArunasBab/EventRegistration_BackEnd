import Joi from "joi";
import { passwordRegex } from "../utils/regex.js";

const loginValidationSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().min(8).required().pattern(passwordRegex).messages({
    "string.pattern.base": "Invalid password",
  }),
}).exist();

export default loginValidationSchema;
