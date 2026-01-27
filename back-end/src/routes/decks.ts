import express from 'express';
import phases from "./phases.js"
import { createDeck, deleteDeck, getAllDecks, getDeck, modifyDeck } from '../controllers/decksController.js';

const router = express.Router();

router.use("/:id/phases", phases);

router.get("/", getAllDecks);
router.get("/:id", getDeck);

router.post("/new", createDeck);
router.patch("/:id", modifyDeck);

router.delete("/:id", deleteDeck);

export default router;