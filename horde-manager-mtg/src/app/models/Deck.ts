import type { Phase } from "./Phase";

export interface Deck {
    id: Number;
    name: String;
    description: String;
    image: URL;

    bosses: Phase;
    phases: Array<Phase>;
}
