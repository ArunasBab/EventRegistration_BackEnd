import express from "express";
import authRouter from "./authRouter.js";
import personRouter from "./personRoutes.js";

const mainRouter = express.Router();

mainRouter.use(authRouter);
mainRouter.use(personRouter);

export default mainRouter;
