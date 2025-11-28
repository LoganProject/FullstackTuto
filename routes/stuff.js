import express from "express";
import {createThing, deleteOneThing, getAllThings, getOneThing, modifyThing} from "../controllers/stuff.js";

export const router = express.Router();

router.get('/', getAllThings);

router.get('/:id', getOneThing)

router.post('/', createThing)

router.put('/:id', modifyThing)

router.delete('/:id', deleteOneThing)