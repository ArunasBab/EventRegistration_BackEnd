import express from "express";
import {
  getUserPersons,
  registerPerson,
  updatePerson,
  deletePerson,
} from "../controllers/personController.js";
import { authenticateToken } from "../middleware/authMiddleware.js";

const router = express.Router();

// Visi šie maršrutai reikalauja autentifikacijos
router.use(authenticateToken);

router.get("/persons", getUserPersons);

router.post("/persons", registerPerson);

router.put("/persons/:id", updatePerson);

router.delete("/persons/:id", deletePerson);

export default router;
