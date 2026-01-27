import express from 'express';
import { getCardData } from '../controllers/cardsController.js';

const router = express.Router();

router.get("/:id", getCardData);

export default router;