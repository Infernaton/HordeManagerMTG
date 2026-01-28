import axios from "axios";
import type { Request, Response }  from "express";

export const getCardData = async (req: Request, res: Response) => {
  try {
    const fetch = await axios.get(`https://api.scryfall.com/cards/` + req.params["id"]);
    res.status(200).json(fetch.data);
  } catch (error) {
    console.log(error);
    res.status(404).json({ message: "fail fetching card data" });
  }
}