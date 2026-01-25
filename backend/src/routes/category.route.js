import express from "express";
import {
  createCategory,
  getCategories,
  updateCategory,
  deleteCategory
} from "../Controllers/category.controller.js"

import { verifyToken, isAdmin } from "../middlewares/auth.middleware.js";

const router = express.Router();
/** Both Admin  & Staff GET all categories*/
router.get("/", verifyToken, getCategories );
/**Admin only Create category*/
router.post("/",verifyToken, isAdmin, createCategory);
/**Admin onlyUpdate category*/
router.put( "/:id",verifyToken, isAdmin, updateCategory);
/**Admin only Soft delete category*/
router.delete("/:id", verifyToken,isAdmin, deleteCategory);

export default router;
