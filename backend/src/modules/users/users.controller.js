import { db } from "../../config/db.js";

export async function getUsers(req, res) {
  const [rows] = await db.query("SELECT * FROM users");
  res.json(rows);
}
