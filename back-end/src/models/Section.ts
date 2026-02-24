import { DB } from "../db.js";
import type { Card } from "./Card.js";

export class Section {
	id: number;
	name?: string;
	description: string;
	color: string;

	card_list: Array<Card>;

	constructor(id: number, fetch: any) {
		this.id = id;
		this.name = fetch.name;
		this.description = fetch.name;
		this.color = fetch.color;

		this.card_list = fetch.card_list;
	}

	static async create(idDeck: number, name?: string, description?: string, color?: string) {
		description = description || "";
		color = color || "#aaaaaa";

		const db = await DB.connection();

		const arr = db.getSections(idDeck);
		if (arr == undefined) throw new Error("Creating Section error - no deck found to create into");

		const data = { name, description, color, card_list: [] };
		const newSection = new Section(arr.length, data);

		db.createSection(idDeck, newSection);

		return newSection;
	}

	async addCards(idDeck: number, ...cards: Array<Card>) {
		const db = await DB.connection();
		this.card_list.push(...cards);
		db.updateSection(idDeck, this);
	}
}
