import type { Request, Response } from "express";
import { DB } from "../db.js";

export const getAllSections = async (req: Request, res: Response) => {
	const db = await DB.connection();
	const currentDeck = db.getDeck(+`${req.params["id_deck"]}`);
	if (currentDeck == undefined) throw new Error("No deck found");

	return { sections: currentDeck.sections };
};
export const getSection = async (req: Request, res: Response) => {
	const db = await DB.connection();
	const section = db.getSectionById(+`${req.params["id_deck"]}`, +`${req.params["id_sections"]}`);
	if (section == undefined) throw new Error("No deck or section found");

	return section;
};
export const createSection = async (req: Request, res: Response) => {
	return { message: "comming soon" };
};
export const modifySection = async (req: Request, res: Response) => {
	return { message: "comming soon" };
};

export const deleteSection = async (req: Request, res: Response) => {
	const db = await DB.connection();
	const success = db.removeSection(+`${req.params["id_deck"]}`, +`${req.params["id_sections"]}`);
	if (!success) throw new Error("No deck or section found");

	return { message: "success" };
};
