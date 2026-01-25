import express from 'express'

import {
    createSupplier,
    getSuppliers,
    updateSupplier,
    deleteSupplier,
} from '../Controllers/supplier.controller.js';

import { verifyToken, isAdmin } from '../middlewares/auth.middleware.js';

const router = express.Router();

/**Both Admin & Staffs */
router.get('/', verifyToken, getSuppliers);

/**Admin Only */
router.post('/', verifyToken, isAdmin, createSupplier);
router.put('/:id', verifyToken, isAdmin, updateSupplier);
router.delete('/:id', verifyToken, isAdmin, deleteSupplier);

export default router ;