import Joi from "joi";
import { emailRegex } from "../utils/regex.js";

export const personRegisterValidation = (data) =>
  Joi.object({
    fullName: Joi.string().min(3).max(100).required(),
    email: Joi.string().pattern(emailRegex).required(),
    age: Joi.number().min(1).max(120).required(),
  }).validate(data);

export const personUpdateValidation = (data) =>
  Joi.object({
    fullName: Joi.string().min(3).max(100).optional(),
    email: Joi.string().pattern(emailRegex).optional(),
    age: Joi.number().min(1).max(120).optional(),
  }).validate(data);
