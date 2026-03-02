import express from "express";
import { getLowStockAlerts, resolveLowStockAlert } from "../Controllers/alert.controller.js";

const router = express.Router();

// Fetch unresolved low-stock alerts
router.get("/", getLowStockAlerts);

// Resolve low-stock alert
router.put("/resolve/:alertId", resolveLowStockAlert);


export default router;