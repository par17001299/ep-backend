// src/routes/authRoutes.js
import express from "express";
import bcrypt from "bcrypt";
import { db } from "../db.js";

const router = express.Router();

// POST /auth/login
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    const [rows] = await db.query(
      "SELECT id, name, email, password_hash FROM users WHERE email = ? AND status = 'Active' LIMIT 1",
      [email]
    );

    if (!rows.length) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const user = rows[0];

    const match = await bcrypt.compare(password, user.password_hash);
    if (!match) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    // Load roles + permissions
    const [roles] = await db.query(
      `
      SELECT r.name AS role
      FROM user_roles ur
      JOIN roles r ON ur.role_id = r.id
      WHERE ur.user_id = ?
      `,
      [user.id]
    );

    const [permissions] = await db.query(
      `
      SELECT DISTINCT p.key_name AS permission
      FROM user_roles ur
      JOIN roles r ON ur.role_id = r.id
      JOIN role_permissions rp ON rp.role_id = r.id
      JOIN permissions p ON rp.permission_id = p.id
      WHERE ur.user_id = ?
      `,
      [user.id]
    );

    req.session.user = {
      id: user.id,
      name: user.name,
      email: user.email,
      roles: roles.map(r => r.role),
      permissions: permissions.map(p => p.permission)
    };

    res.json({ message: "Logged in", user: req.session.user });
  } catch (err) {
    console.error("Login error:", err);
    res.status(500).json({ message: "Server error" });
  }
});

// POST /auth/logout
router.post("/logout", (req, res) => {
  req.session.destroy(() => {
    res.clearCookie("ep_sid");
    res.json({ message: "Logged out" });
  });
});

// GET /auth/me
router.get("/me", (req, res) => {
  if (!req.session.user) {
    return res.status(401).json({ message: "Not authenticated" });
  }
  res.json(req.session.user);
});

export default router;
