import type Card from "./Card.js";

const phaseModel = {
    id: Number,
    description: String,
    color: String,

    card_list: Array<typeof Card>
};

export default phaseModel;