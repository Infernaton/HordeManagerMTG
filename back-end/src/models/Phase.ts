import type { Card } from "./Card.js";

export interface Phase {
	id: number;
	description: string;
	color: string;

	card_list: Array<Card>;
}
