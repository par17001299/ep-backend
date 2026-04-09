// src/app.js
import express from "express";
import session from "express-session";
import MySQLStoreFactory from "express-mysql-session";
import cors from "cors";
import dotenv from "dotenv";
import { db } from "./config/db.js";
import authRoutes from "./src/modules/auth/auth.routes.js";
import usersRoutes from "./src/modules/users/users.routes.js";


dotenv.config();

const app = express();

// CORS – adjust origin for your frontend
app.use(
  cors({
    origin: process.env.FRONTEND_ORIGIN || "http://localhost:8080",
    credentials: true
  })
);

app.use(express.json());

// Session store using same DATABASE_URL
const MySQLStore = MySQLStoreFactory(session);

const sessionStore = new MySQLStore(
  {
    clearExpired: true,
    checkExpirationInterval: 15 * 60 * 1000,
    expiration: 24 * 60 * 60 * 1000
  },
  db
);

app.use(
  session({
    name: "ep_sid",
    secret: process.env.SESSION_SECRET || "change_me",
    resave: false,
    saveUninitialized: false,
    store: sessionStore,
    cookie: {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
      maxAge: 24 * 60 * 60 * 1000
    }
  })
);

// Health check
app.get("/health", (req, res) => {
  res.json({ status: "ok" });
});

// Routes
app.use("/auth", authRoutes);
app.use("/users", usersRoutes);

export default app;
