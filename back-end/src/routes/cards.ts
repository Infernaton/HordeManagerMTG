import express from "express";
import { getCardData, searchCards } from "../controllers/cardsController.js";
import { apiCall } from "../middleware/handler.js";

const router = express.Router();

router.get("/search", (req, res) => apiCall(req, res, searchCards));
router.get("/:id", (req, res) => apiCall(req, res, getCardData));

export default router;
