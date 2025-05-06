import loginValidationSchema from "../validationSchemas/LoginValidationSchema.js";

export function loginUserValidation(req, res, next) {
  const { error } = loginValidationSchema.validate(req.body);

  if (error) {
    const errorMessage = error.details[0].message;
    res.status(400).json({
      error: errorMessage,
    });
  } else {
    next();
  }
}
