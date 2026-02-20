import type { Request, Response } from "express";

export const getAllSections = async (req: Request, res: Response) => {
	try {
		res.status(200).json({ message: "success" });
	} catch (error) {
		res.status(404).json({ message: "fail" });
	}
};
export const getSection = async (req: Request, res: Response) => {
	try {
		res.status(200).json({ message: "success" });
	} catch (error) {
		res.status(404).json({ message: "fail" });
	}
};
export const createSection = async (req: Request, res: Response) => {
	try {
		res.status(200).json({ message: "success" });
	} catch (error) {
		res.status(404).json({ message: "fail" });
	}
};
export const modifySection = async (req: Request, res: Response) => {
	try {
		res.status(200).json({ message: "success" });
	} catch (error) {
		res.status(404).json({ message: "fail" });
	}
};

export const deleteSection = async (req: Request, res: Response) => {
	try {
		res.status(200).json({ message: "success" });
	} catch (error) {
		res.status(404).json({ message: "fail" });
	}
};
