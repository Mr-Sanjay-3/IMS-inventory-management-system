import express from "express";
import { getLowStockAlerts, resolveLowStockAlert } from "../controllers/alert.controller.js";

const router = express.Router();

// Fetch unresolved low-stock alerts
router.get("/alerts", getLowStockAlerts);

// Resolve low-stock alert
router.put("/alerts/:alertId/resolve", resolveLowStockAlert);

export default router;