//  responsible for managing requests and responses

import * as authService from "../services/authService.js";
import dotenv from "dotenv";
dotenv.config();

export async function signUp(req, res) {
  const { username, email, password, picture } = req.body;
  await authService.signUp(username, email, password, picture);
  res.sendStatus(201);
}

export async function signIn(req, res) {
  const { email, password } = req.body;
  const result = await authService.signUp(email, password);
  return res.send(result).status(200);
}

export async function signOut(req, res) {
  const { session } = res.locals;
  await authService.signOut(session);
  res.sendStatus(200);
}
