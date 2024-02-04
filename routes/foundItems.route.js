import express,{Router} from 'express';
import { verifyToken } from '../middlewares/jwt.js';
import {foundItems} from "../controllers/auth.controller.js";

const router  = Router();
router.get('/',verifyToken,foundItems);

export  default router;