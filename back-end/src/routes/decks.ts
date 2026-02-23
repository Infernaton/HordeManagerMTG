import express from "express";
import sections from "./sections.js";
import {
	createDeck,
	deleteDeck,
	getAllDecks,
	getDeck,
	importBulk,
	modifyDeck,
} from "../controllers/decksController.js";

const router = express.Router();

router.use("/:id_deck/phases", sections);

router.get("/", getAllDecks);
router.get("/:id_deck", getDeck);

router.post("/new", createDeck);
router.post("/:id_deck/import", importBulk);

router.patch("/:id_deck", modifyDeck);

router.delete("/:id_deck", deleteDeck);

export default router;
