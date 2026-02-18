import type { Card } from "./Card.js";
import type { Phase } from "./Phase.js";

// Except to work with the Horde Game
// Might also work with common deck
export interface HordeDeck {
	id: Number;
	name: String;
	description: String;
	image: URL;

	bosses?: Phase;
	phases: Array<Phase>;
	unsorted?: Array<Card>;
}
