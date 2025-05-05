import Joi from "joi";
import { passwordRegex } from "../utils/regex.js";

const userValidationSchema = Joi.object({
  name: Joi.string().min(2).max(30).required().messages({
    "string.empty": "Vardas yra privalomas",
    "any.required": "Vardas yra privalomas",
  }),
  lastName: Joi.string().min(2).max(30).required().messages({
    "string.empty": "Pavardė yra privaloma",
    "any.required": "Pavardė yra privaloma",
  }),
  email: Joi.string().email().required().messages({
    "string.email": "Įveskite tinkamą el. pašto adresą",
    "string.empty": "El. paštas yra privalomas",
    "any.required": "El. paštas yra privalomas",
  }),
  password: Joi.string().min(8).required().pattern(passwordRegex).messages({
    "string.min": "Slaptažodis turi būti bent 8 simbolių",
    "string.pattern.base":
      "Slaptažodyje turi būti bent viena mažoji raidė, viena didžioji raidė, vienas skaičius ir vienas specialus simbolis (!@#$%^&*)",
    "string.empty": "Slaptažodis yra privalomas",
    "any.required": "Slaptažodis yra privalomas",
  }),
});

export default userValidationSchema;
