import { connection } from "../config/postgres.js";

export async function getUserByEmail(email) {
  return connection.query(`SELECT * FROM users WHERE email = $1 `, [email]);
}
