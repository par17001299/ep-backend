import express from "express";
import cors from "cors";
import { sessionMiddleware } from "./config/session.js";

import authRoutes from "./modules/auth/auth.routes.js";
import userRoutes from "./modules/users/users.routes.js";

const app = express();

app.use(cors({
  origin: "http://localhost:65386",
  credentials: true
}));

app.use(express.json());
app.use(sessionMiddleware);

app.use("/auth", authRoutes);
app.use("/users", userRoutes);

export default app;
