import axios from "axios";
import type { Request, Response } from "express";
import { Card } from "../models/Card.js";
import type e from "express";
import type { IDictionary } from "../models/interface.js";

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
		const identifiers: Array<{}> = [];
		let stringArrBulk = bulk.split("\n\n");
		let storedBulk: any = {};

		const regex = new RegExp("^[^0-9]");

		for (let i = 0; i < stringArrBulk.length; i++) {
			const strSplit: Array<string> = stringArrBulk[i].split("\n");
			const objSplit: IDictionary<string> = {};
			strSplit.forEach((e) => {
				const s = e.split(/ (.*)/s);
				objSplit[s[1]] = s[0];
			});

			if (regex.test(stringArrBulk[i])) {
				delete objSplit["undefined"];
				storedBulk[strSplit[0].replace(":", "")] = objSplit;
			} else {
				storedBulk[i] = objSplit;
			}

			// objSplit.forEach((e) => {
			// 	if (prepareFetchBulk[e]) prepareFetchBulk[e];
			// });
		}

		// const { data: fetch } = await axios.post(`${API_URL}/cards/collection`, { identifiers });
		// const { data: card_result } = fetch;

		// let cards: Array<Card> = [];
		// for (let i = 0; i < card_result.length; i++) {
		// 	const card: Card = new Card(card_result[i]);
		// 	cards.push(card);
		// }

		res.status(200).json({ storedBulk });
	} catch (error) {
		console.log(error);
		res.status(404).json({ message: "fail searching for cards data", error });
	}
};
