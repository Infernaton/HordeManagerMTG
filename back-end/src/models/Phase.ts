import type { Card } from "./Card.js";

export interface Phase {
    id: Number,
    description: String,
    color: String,

    card_list: Array<Card>
};