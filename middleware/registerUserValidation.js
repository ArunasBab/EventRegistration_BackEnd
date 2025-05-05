import userValidationSchema from "../validationSchemas/userValidationSchemas.js";

export function registerUserValidation(req, res, next) {
  const body = req.body;

  const { error } = userValidationSchema.validate(body);

  if (error) {
    return res.status(400).json({
      error: error.details[0].message,
    });
  }

  next();
}
