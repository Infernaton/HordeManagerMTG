import axios from "axios";
import type { Request, Response } from "express";
import { Card } from "../models/Card.js";
import { Scryfall } from "../api/scryfall.js";

const API_URL = "https://api.scryfall.com";

export const getCardData = async (req: Request, res: Response) => {
	const { data: fetch } = await Scryfall.getCard(req.params["id"] as string);

	return new Card(fetch);
};

export const searchCards = async (req: Request, res: Response) => {
	const { data: fetch } = await Scryfall.searchCard(req.query["q"] as string);
	const { data: card_result } = fetch;

	let cards: Array<Card> = [];
	for (let i = 0; i < card_result.length; i++) {
		const card: Card = new Card(card_result[i]);
		cards.push(card);
	}

	return cards;
};
