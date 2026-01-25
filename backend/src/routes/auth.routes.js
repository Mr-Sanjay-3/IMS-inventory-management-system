import express from "express";
import { login, register } from "../Controllers/auth.controller.js"
import { verifyToken, isAdmin } from "../middlewares/auth.middleware.js";

const router = express.Router();

router.post("/login", login);
router.post("/register", verifyToken,  isAdmin, register);

export default router;
