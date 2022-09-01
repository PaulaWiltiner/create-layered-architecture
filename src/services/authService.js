// responsible for business rules
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import {
  createSession,
  deleteSession,
  validateEmail,
} from "../repositories/authRepository.js";
import { createUser } from "../repositories/authRepository.js";
import { getUserByEmail } from "../repositories/usersRepository.js";

export async function signUp(username, email, password, picture) {
  const { rows: isEmail } = await validateEmail(email);

  if (isEmail.length > 0) {
    throw { code: "Conflict", massage: "email is already being used" };
  }

  const hashPassword = bcrypt.hashSync(password, 10);
  await createUser(picture, username, email, hashPassword);
}

export async function signIn(email) {
  const { rows: users } = await getUserByEmail(email, password);
  const [user] = users;

  if (!user) {
    throw { code: "NotFound", massage: "user not found" };
  }
  if (bcrypt.compareSync(password, user.password)) {
    users[0].email;
    const token = jwt.sign(
      { id: user.id, email: users[0].email },
      process.env.ACCESS_TOKEN
    );
    await createSession(token, user.id);
    return {
      userId: user.id,
      username: user.username,
      picture: user.picture,
      token,
    };
  } else {
    throw { code: "Unathorized", massage: "user unathorized" };
  }
}

export async function signOut(session) {
  await deleteSession(session.id);
}
