import type { Card } from "./Card.js";
import type { Phase } from "./Phase.js";

export interface Deck {
	id: Number;
	name: String;
	description: String;
	image: URL;

	bosses?: Phase;
	phases: Array<Phase>;
	unsorted?: Array<Card>;
}
