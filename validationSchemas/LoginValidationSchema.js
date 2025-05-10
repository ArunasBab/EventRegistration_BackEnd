import Joi from "joi";
import { emailRegex, passwordRegex } from "../utils/regex.js";

const loginValidationSchema = Joi.object({
  email: Joi.string().pattern(emailRegex).required().messages({
    "string.empty": "El. paštas privalomas",
    "string.pattern.base": "Netinkamas el. pašto formatas",
  }),
  password: Joi.string().pattern(passwordRegex).required().messages({
    "string.empty": "Slaptažodis privalomas",
    "string.pattern.base": "Netinkamas slaptažodžio formatas",
  }),
});

export default loginValidationSchema;
