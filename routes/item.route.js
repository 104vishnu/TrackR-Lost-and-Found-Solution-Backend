import express from "express";
import { postItem } from "../controllers/auth.controller.js";
import { verifyToken } from "../middlewares/jwt.js";

import {Router} from 'express';

const router = Router();

router.post("/",verifyToken,postItem);

export default router;

