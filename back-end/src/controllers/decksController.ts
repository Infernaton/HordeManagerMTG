import axios, { type AxiosResponse } from "axios";
import type { Request, Response } from "express";
import { Card } from "../models/Card.js";
import { bulkReadFormat } from "../middleware/stringManipulation.js";
import { DB } from "../db.js";
import { Section } from "../models/Section.js";

export const getAllDecks = async (req: Request, res: Response) => {
	const db = await DB.connection();
	return { decks: db.getDecks() };
};
export const getDeck = async (req: Request, res: Response) => {
	const db = await DB.connection();
	return db.getDeck(+`${req.params["id_deck"]}`);
};

export const createDeck = async (req: Request, res: Response) => {
	return { message: "comming soon" };
};
export const modifyDeck = async (req: Request, res: Response) => {
	return { message: "comming soon" };
};

export const deleteDeck = async (req: Request, res: Response) => {
	return { message: "comming soon" };
};

const API_URL = "https://api.scryfall.com";

export const importBulk = async (req: Request, res: Response) => {
	const { bulk }: { bulk: string } = req.body;

	const db = await DB.connection();
	const currentDeck = db.getDeck(+`${req.params["id_deck"]}`);
	if (currentDeck == undefined) throw new Error("No deck was found");

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

	// let cards: Array<Card> = [];
	for (let i = 0; i < found.length; i++) {
		const card: Card = new Card(found[i]);
		// cards.push(card);
		for (const [key, value] of Object.entries(sortedCard)) {
			// key -> name of the part
			// value -> all the card name from that part
			const fullCardName = card.front_card.name + (card.back_card ? " / " + card.back_card.name : "");
			// console.log(fullCardName, value);
			if (value[fullCardName] == undefined) continue;

			for (let o = 0; o < value[fullCardName]; o++) {
				// Meaning it hasn't a clear section name, don't know how to sort the card
				if (/^[0-9]$/gm.test(key)) db.addUnsortedCard(currentDeck.id, card);
				else {
					let section = db.getSection(currentDeck.id, (e) => key == e.name);
					if (section == undefined) section = await Section.create(currentDeck.id, key, "", "#aaaaaa");
					await section.addCards(currentDeck.id, card);
				}
			}
		}
	}
	db.commit();

	// return { sortedCard, filteredData, notFound, cards };
	return { notFound };
};
