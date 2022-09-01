// for midway validation

import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import { getSession } from "../repositories/authRepository.js";
dotenv.config();

export default async function authenticateToken(req, res, next) {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];

  if (token == null) {
    throw { code: "Unathorized", massage: "user unathorized" };
  }

  try {
    const user = jwt.verify(token, process.env.ACCESS_TOKEN);
    req.email = user.email;
    res.locals.userId = user.id;
  } catch {
    throw { code: "Unathorized", massage: "user unathorized" };
  }

  const session = await getSession(token);

  if (!session) {
    throw { code: "Unathorized", massage: "user unathorized" };
  }

  res.locals.session = session;
  next();
}
