import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import router from "./routes/index.js";
import mongoose from "mongoose";

dotenv.config();

const { PORT, CORS_ORIGIN, MONGO_URI } = process.env;

mongoose
  .connect(MONGO_URI, {
    dbName: "Event_Registration",
  })
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.log(err));

const app = express();

app.use(
  cors({
    origin: CORS_ORIGIN,
  })
);

app.use(express.json());

app.use(router);

app.get("/", (req, res) => {
  res.json({
    message: "Hello world dar kazkas",
  });
});

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
