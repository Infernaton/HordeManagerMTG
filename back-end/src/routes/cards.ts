import express from "express";
import { getCardData, searchCards } from "../controllers/cardsController";

const router = express.Router();

router.get("/search", searchCards);
router.get("/:id", getCardData);

export default router;
