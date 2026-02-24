import axios from "axios";
import type { Request, Response } from "express";
import { Card } from "../models/Card.js";

const API_URL = "https://api.scryfall.com";

export const getCardData = async (req: Request, res: Response) => {
	const { data: fetch } = await axios.get(`${API_URL}/cards/${req.params["id"]}`);

	return new Card(fetch);
};

export const searchCards = async (req: Request, res: Response) => {
	const { data: fetch } = await axios.get(`${API_URL}/cards/search?q=${req.query["q"]}`);
	const { data: card_result } = fetch;

	let cards: Array<Card> = [];
	for (let i = 0; i < card_result.length; i++) {
		const card: Card = new Card(card_result[i]);
		cards.push(card);
	}

	return cards;
};
