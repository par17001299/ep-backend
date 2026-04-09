// src/routes/usersRoutes.js
import express from "express";
import { db } from "../db.js";
import { requireAuth, requirePermission } from "../middleware/rbacMiddleware.js";

const router = express.Router();

// GET /users
router.get(
  "/",
  requireAuth,
  requirePermission("users.view"),
  async (req, res) => {
    try {
      const [rows] = await db.query(
        "SELECT id, emp_number, name, email, status FROM users"
      );
      res.json(rows);
    } catch (err) {
      console.error("Users list error:", err);
      res.status(500).json({ message: "Server error" });
    }
  }
);

export default router;
