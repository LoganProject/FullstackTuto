import express from 'express';
import {signIn, signUp} from "../controllers/user.js";

export const router = express.Router();

router.post('/signup', signUp);
router.post('/login', signIn);