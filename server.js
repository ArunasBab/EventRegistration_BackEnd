import express from "express";
import dotenv from "dotenv";
import cors from "cors";

dotenv.config();

const PORT = process.env.PORT;

const app = express();

app.use(cors());

app.use(express.json());

app.get("/", (req, res) => {
  res.json({
    message: "Hello world dar kazkas",
  });
});

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
