import type { Card } from "./Card.js";
import type { DeckFormat } from "./IType.js";
import type { Section } from "./Section.js";

// Except to work with the Horde Game
// Might also work with common deck
export interface Deck {
	id: number;
	name: string;
	description: string;
	image: URL;
	format: DeckFormat;

	bosses?: Section;
	sections: Array<Section>;
	unsorted?: Array<Card>;

	card_relation?: Array<Card>;
}
