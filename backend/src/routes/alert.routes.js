import express from 'express';
import { getLowStockAlerts } from "../Controllers/lowStock.controller.js";
import {verifyToken , isAdmin} from '../middlewares/auth.middleware.js';

const router = express.Router();

router.get('/', verifyToken, isAdmin, getLowStockAlerts);

export default router
