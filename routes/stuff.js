import express from "express";
import {createThing, deleteOneThing, getAllThings, getOneThing, modifyThing} from "../controllers/stuff.js";
import {middleware as auth} from "../middleware/auth.js";

export const router = express.Router();

router.get('/', auth, getAllThings);

router.get('/:id', auth, getOneThing)

router.post('/', auth, createThing)

router.put('/:id', auth, modifyThing)

router.delete('/:id', auth, deleteOneThing)