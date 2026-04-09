import express from "express";
import { getUsers } from "./users.controller.js";
import { auth } from "../../middleware/auth.js";
import { rbac } from "../../middleware/rbac.js";

const router = express.Router();

router.get("/", auth, rbac("users.view"), getUsers);

export default router;
