import axios from "axios";
import type { Request, Response } from "express";
import { Card } from "../models/Card.js";

const API_URL = "https://api.scryfall.com";

export const getCardData = async (req: Request, res: Response) => {
	try {
		const { data: fetch } = await axios.get(`${API_URL}/cards/${req.params["id"]}`);

		res.status(200).json(new Card(fetch));
	} catch (error) {
		console.log(error);
		res.status(404).json({ message: "fail fetching card data", error });
	}
};

export const searchCards = async (req: Request, res: Response) => {
	try {
		const { data: fetch } = await axios.get(`${API_URL}/cards/search?q=${req.query["q"]}`);
		const { data: card_result } = fetch;

		let cards: Array<Card> = [];
		for (let i = 0; i < card_result.length; i++) {
			const card: Card = new Card(card_result[i]);
			cards.push(card);
		}

		res.status(200).json(cards);
	} catch (error) {
		console.log(error);
		res.status(404).json({ message: "fail searching for card data", error });
	}
};
