import axios from "axios";
import type { Request, Response }  from "express";
import type { Card } from "../models/Card.js"

export const getCardData = async (req: Request, res: Response) => {
  try {
    const { data: fetch } = await axios.get(`https://api.scryfall.com/cards/` + req.params["id"]);
    const card: Card = {
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

    res.status(200).json(card);
  } catch (error) {
    console.log(error);
    res.status(404).json({ message: "fail fetching card data" });
  }
}