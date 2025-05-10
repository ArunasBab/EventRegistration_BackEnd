import loginValidationSchema from "../validationSchemas/LoginValidationSchema.js";

export function loginUserValidation(req, res, next) {
  const { error } = loginValidationSchema.validate(req.body);

  if (error) {
    res.status(400).json({
      error: error.details[0].message,
    });
  } else {
    next();
  }
}
