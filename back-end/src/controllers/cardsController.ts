import axios from "axios";
import type { Request, Response } from "express";
import type { Card } from "../models/Card.js";

const extractCardData = (fetch: any) => {
    return {
        id: fetch.id,
        name: fetch.name,
        mana_cost: fetch.mana_cost,
        type_line: fetch.type_line,
        oracle_text: fetch.oracle_text,
        power: fetch.power,
        toughness: fetch.toughness,
        crop_image: new URL(fetch.image_uris.art_crop),
        full_image: new URL(fetch.image_uris.normal),
    };
};

export const getCardData = async (req: Request, res: Response) => {
    try {
        const { data: fetch } = await axios.get(`https://api.scryfall.com/cards/` + req.params["id"]);
        const card: Card = extractCardData(fetch);

        res.status(200).json(card);
    } catch (error) {
        console.log(error);
        res.status(404).json({ message: "fail fetching card data" });
    }
};

export const searchCards = async (req: Request, res: Response) => {
    try {
        const { data: fetch } = await axios.get(`https://api.scryfall.com/cards/search?q=` + req.query["search"]);
        const { data: card_result } = fetch;

        let cards = [] as Array<Card>;
        for (let i = 0; i < card_result.length; i++) {
            const card: Card = extractCardData(card_result[i]);
            cards.push(card);
        }

        res.status(200).json(cards);
    } catch (error) {
        // console.log(error);
        res.status(404).json({ message: "fail fetching card data" });
    }
};
