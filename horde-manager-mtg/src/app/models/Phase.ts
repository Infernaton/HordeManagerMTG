import type { Card } from "./Card";

export interface Phase {
    id: Number;
    description: String;
    color: String;

    card_list: Array<Card>;
}
