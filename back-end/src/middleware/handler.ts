import { type Request, type Response } from "express";

export const apiCall = async (req: Request, res: Response, callback: (req: Request, res: Response) => {}) => {
	try {
		res.setHeader("Access-Control-Allow-Origin", "http://localhost:3000");
		const json = await callback(req, res);
		res.status(200).json(json);
	} catch (error) {
		console.log(error);
		res.status(500).json({ error });
	}
};
