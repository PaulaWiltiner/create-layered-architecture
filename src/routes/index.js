// only the use of routes

import { Router } from "express";
import authRouter from "./authRoutes.js";

const router = Router();

router.use(authRouter);

export default router;
