// only the routes for the requets

import { Router } from "express";
import signInSchema from "../schemas/signInSchema.js";
import signUpSchema from "../schemas/signUpSchema.js";
import { signIn, signUp, signOut } from "../controllers/authController.js";
import { validateSchema } from "../middlewares/schemaValidator.js";
import authenticateToken from "../middlewares/authenticateToken.js";

const authRouter = Router();

authRouter.post("/signin", validateSchema(signInSchema), signIn);
authRouter.put("/signout", authenticateToken, signOut);
authRouter.post("/signup", validateSchema(signUpSchema), signUp);

export default authRouter;
