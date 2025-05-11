import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import mongoose from "mongoose";
import router from "./routes/index.js";
import { errorHandler } from "./middleware/errorMiddleware.js";

dotenv.config();

const { PORT, CORS_ORIGIN, MONGO_URI } = process.env;

mongoose
  .connect(MONGO_URI, { dbName: "Event_Registration" })
  .then(() => console.log("Prisijungta prie MongoDB"))
  .catch((err) => console.error("MongoDB klaida:", err));

const app = express();

app.use(
  cors({
    origin: "*",
    credentials: false,
  })
);

app.use(express.json());

app.use(router);

app.use(errorHandler);

app.listen(PORT, () => console.log(`Serveris veikia ant ${PORT} porto`));
