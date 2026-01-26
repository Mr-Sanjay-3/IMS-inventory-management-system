import express from "express";
import { getAdminStatus } from "../Controllers/admin.controller.js";
import { verifyToken, isAdmin } from "../middlewares/auth.middleware.js";

const router = express.Router();

router.get("/status", verifyToken, isAdmin, getAdminStatus);

export default router;
