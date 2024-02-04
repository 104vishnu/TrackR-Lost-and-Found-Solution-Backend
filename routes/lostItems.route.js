import express,{Router} from 'express';
import { verifyToken } from '../middlewares/jwt.js';
import {lostItems} from "../controllers/auth.controller.js";

const router  = Router();
router.get('/',verifyToken,lostItems);

export  default router;