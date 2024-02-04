import express,{Router} from 'express';
import { verifyToken } from '../middlewares/jwt.js';
import {myItems} from "../controllers/auth.controller.js";

const router  = Router();
router.get('/',verifyToken,myItems);

export  default router;