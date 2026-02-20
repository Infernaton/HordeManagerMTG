import { DB } from "../db.js";
import type { Card } from "./Card.js";

export class Section {
	id: number;
	name?: string;
	description: string;
	color: string;

	card_list: Array<Card>;

	constructor(fetch: any) {
		this.id = fetch.id;
		this.name = fetch.name;
		this.description = fetch.name;
		this.color = fetch.color;

		this.card_list = fetch.card_list;
	}

	static create(name?: string, description?: string, color?: string) {
		const data = { name, description, color, card_list: [] };

		return new Section(data);
	}

	async addCards(db: DB, idDeck: number, ...cards: Array<Card>) {
		this.card_list.push(...cards);
		db.updateSection(idDeck, this);
	}
}
