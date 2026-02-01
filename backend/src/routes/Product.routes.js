import express from "express"
import { 
    createproduct,
    getProducts,
    getProductById,
    updateProduct,
    deleteProduct
 } from "../Controllers/product.controller.js"

 //  Verify {token is have } then Permite CRUD Operation :)
 import {verifyToken, isAdmin} from '../middlewares/auth.middleware.js'

 const router = express.Router();
 
 //Admin
 router.post('/', verifyToken, isAdmin, createproduct);
 router.put('/:id', verifyToken, isAdmin, updateProduct);
 router.delete('/:id', verifyToken, isAdmin, deleteProduct);

 //Admin & Staffs see Product Stocks

 router.get('/', verifyToken, getProducts);
 router.get('/:id', verifyToken, getProductById);

 export default router