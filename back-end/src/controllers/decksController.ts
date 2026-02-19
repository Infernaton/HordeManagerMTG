import axios, { type AxiosResponse } from "axios";
import type { Request, Response } from "express";
import { Card } from "../models/Card.js";
import type e from "express";
import type { IDictionary } from "../models/interface.js";
import { bulkReadFormat } from "../middleware/stringManipulation.js";

export const getAllDecks = async (req: Request, res: Response) => {
	try {
		res.status(200).json({ message: "success" });
	} catch (error) {
		res.status(404).json({ message: "fail" });
	}
};
export const getDeck = async (req: Request, res: Response) => {
	try {
		res.status(200).json({ message: "success" });
	} catch (error) {
		res.status(404).json({ message: "fail" });
	}
};
export const createDeck = async (req: Request, res: Response) => {
	try {
		res.status(200).json({ message: "success" });
	} catch (error) {
		res.status(404).json({ message: "fail" });
	}
};
export const modifyDeck = async (req: Request, res: Response) => {
	try {
		res.status(200).json({ message: "success" });
	} catch (error) {
		res.status(404).json({ message: "fail" });
	}
};

export const deleteDeck = async (req: Request, res: Response) => {
	try {
		res.status(200).json({ message: "success" });
	} catch (error) {
		res.status(404).json({ message: "fail" });
	}
};

const API_URL = "https://api.scryfall.com";

export const importBulk = async (req: Request, res: Response) => {
	try {
		const { bulk }: { bulk: string } = req.body;
		// what the api call need
		const { apiCallBody: identifiers, sortedCard } = bulkReadFormat(bulk);

		let fetches: Array<Promise<AxiosResponse<any, any, {}>>> = [];
		const MAX_REQUEST_CARD = 75;
		for (let i = 0; i < identifiers.length; i = i + MAX_REQUEST_CARD) {
			fetches.push(
				axios.post(`${API_URL}/cards/collection`, {
					identifiers: identifiers.slice(i, i + MAX_REQUEST_CARD),
				}),
			);
		}

		const data = await Promise.all(fetches);
		const filteredData = data.map((d) => d.data);
		const found = filteredData.flatMap((e) => e.data);
		const notFound = filteredData.flatMap((e) => e.not_found);

		let cards: Array<Card> = [];
		for (let i = 0; i < found.length; i++) {
			// console.log(found[i].id, found[i].name);
			const card: Card = new Card(found[i]);
			cards.push(card);
		}

		// res.status(200).json({ sortedCard, filteredData, notFound, cards });
		res.status(200).json({ notFound, found: cards });
	} catch (error) {
		console.log(error);
		res.status(404).json({ message: "fail searching for cards data", error });
	}
};
