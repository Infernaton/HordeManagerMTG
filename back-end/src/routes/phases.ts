import express from 'express';
import { createPhase, deletePhase, getAllPhases, getPhase, modifyPhase } from '../controllers/phasesController.js';

const router = express.Router();

router.get("/", getAllPhases);
router.get("/:id", getPhase);

router.post("/new", createPhase);
router.patch("/:id", modifyPhase);

router.delete("/:id", deletePhase);

export default router;