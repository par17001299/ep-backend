import bcrypt from "bcrypt";
import { db } from "../../config/db.js";

export async function login(req, res) {
  const { email, password } = req.body;

  const [rows] = await db.query("SELECT * FROM users WHERE email = ?", [email]);
  const user = rows[0];

  if (!user) return res.status(400).json({ error: "Invalid credentials" });

  const match = await bcrypt.compare(password, user.password_hash);
  if (!match) return res.status(400).json({ error: "Invalid credentials" });

  const [roles] = await db.query(
    `SELECT r.name FROM roles r
     JOIN user_roles ur ON ur.role_id = r.id
     WHERE ur.user_id = ?`,
    [user.id]
  );

  const [permissions] = await db.query(
    `SELECT p.key_name FROM permissions p
     JOIN role_permissions rp ON rp.permission_id = p.id
     JOIN user_roles ur ON ur.role_id = rp.role_id
     WHERE ur.user_id = ?`,
    [user.id]
  );

  req.session.user = {
    id: user.id,
    name: user.name,
    email: user.email,
    roles: roles.map(r => r.name),
    permissions: permissions.map(p => p.key_name)
  };

  res.json({ message: "Logged in", user: req.session.user });
}

export function logout(req, res) {
  req.session.destroy(() => {
    res.json({ message: "Logged out" });
  });
}
