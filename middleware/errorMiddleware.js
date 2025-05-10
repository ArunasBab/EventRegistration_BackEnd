export const errorHandler = (err, req, res, next) => {
  console.error(err.stack);

  if (err.name === "ValidationError") {
    const messages = Object.values(err.errors).map((val) => val.message);
    return res.status(400).json({
      message: "Validacijos klaida",
      errors: messages,
    });
  }

  if (err.code === 11000) {
    return res.status(400).json({
      message: "Toks el. paštas jau egzistuoja",
    });
  }

  res.status(500).json({
    message: "Serverio klaida",
  });
};
