import express from'express';
 const router = express.Router();

  
import {getStaff,
  createStaff,
  updateStaff,
  deleteStaff} from '../Controllers/employee.controller.js';
import { isAdmin, verifyToken } from '../middlewares/auth.middleware.js';

router.get("/", verifyToken, isAdmin, getStaff);
router.post("/",verifyToken, isAdmin ,createStaff);
router.put("/:id", verifyToken, isAdmin, updateStaff);
router.delete("/:id", verifyToken, isAdmin, deleteStaff);

export default router;