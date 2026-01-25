import express from 'express';
import { stockIn, stockOut } from '../Controllers/stockMovement.controller.js';
import { verifyToken, isAdmin } from '../middlewares/auth.middleware.js';


const router = express.Router();

//Only Admin Can Add Stock
router.post('/in', verifyToken, isAdmin, stockIn);
//Both Admin & Staff can Reduse Stock
router.post('/out', verifyToken, stockOut);

export default router;