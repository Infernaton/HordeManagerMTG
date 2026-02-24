import type { Card } from "./Card.js";
import type { Section } from "./Section.js";

// Except to work with the Horde Game
// Might also work with common deck
export interface HordeDeck {
	id: number;
	name: string;
	description: string;
	image: URL;

	bosses?: Section;
	sections: Array<Section>;
	unsorted?: Array<Card>;
}
