import express from 'express'
import { getAlerts } from '../Controllers/alert.controller'
import {verifyToken , isAdmin} from '../middlewares/auth.middleware'

const router = express.Router();

router.get('/', verifyToken, isAdmin, getAlerts);

export default router
