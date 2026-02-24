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
import { apiCall } from "../middleware/handler.js";

const router = express.Router();

router.use("/:id_deck/phases", sections);

router.get("/", (req, res) => apiCall(req, res, getAllDecks));
router.get("/:id_deck", (req, res) => apiCall(req, res, getDeck));

router.post("/new", (req, res) => apiCall(req, res, createDeck));
router.post("/id_deck/import", (req, res) => apiCall(req, res, importBulk));

router.patch("/:id_deck", (req, res) => apiCall(req, res, modifyDeck));

router.delete("/:id_deck", (req, res) => apiCall(req, res, deleteDeck));

export default router;
