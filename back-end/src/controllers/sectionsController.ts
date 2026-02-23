import type { Request, Response } from "express";
import { DB } from "../db.js";

export const getAllSections = async (req: Request, res: Response) => {
	try {
		const db = await DB.connection();
		const currentDeck = db.getDeck(+`${req.params["id_deck"]}`);
		if (currentDeck == undefined) throw new Error("No deck found");

		res.status(200).json({ sections: currentDeck.sections });
	} catch (error) {
		res.status(404).json({ message: "fail" });
	}
};
export const getSection = async (req: Request, res: Response) => {
	try {
		const db = await DB.connection();
		const section = db.getSectionById(+`${req.params["id_deck"]}`, +`${req.params["id_sections"]}`);
		if (section == undefined) throw new Error("No deck or section found");

		res.status(200).json(section);
	} catch (error) {
		res.status(404).json({ message: "fail" });
	}
};
export const createSection = async (req: Request, res: Response) => {
	try {
		const db = await DB.connection();
		res.status(200).json({ message: "success" });
	} catch (error) {
		res.status(404).json({ message: "fail" });
	}
};
export const modifySection = async (req: Request, res: Response) => {
	try {
		const db = await DB.connection();
		res.status(200).json({ message: "success" });
	} catch (error) {
		res.status(404).json({ message: "fail" });
	}
};

export const deleteSection = async (req: Request, res: Response) => {
	try {
		const db = await DB.connection();
		const success = db.removeSection(+`${req.params["id_deck"]}`, +`${req.params["id_sections"]}`);
		if (!success) throw new Error("No deck or section found");

		res.status(200).json({ message: "success" });
	} catch (error) {
		res.status(404).json({ message: "fail" });
	}
};
