import Joi from "joi";
import { emailRegex, passwordRegex } from "../utils/regex.js";

const userValidationSchema = Joi.object({
  name: Joi.string().min(2).max(30).required().messages({
    "string.empty": "Vardas privalomas",
  }),
  lastName: Joi.string().min(2).max(30).required().messages({
    "string.empty": "Pavardė privaloma",
  }),
  email: Joi.string().pattern(emailRegex).required().messages({
    "string.empty": "El. paštas privalomas",
    "string.pattern.base": "Netinkamas el. pašto formatas",
  }),
  password: Joi.string().pattern(passwordRegex).required().messages({
    "string.empty": "Slaptažodis privalomas",
    "string.pattern.base": "Netinkamas slaptažodžio formatas",
  }),
});

export default userValidationSchema;
