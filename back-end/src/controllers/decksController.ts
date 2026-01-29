import type { Request, Response } from "express";

export const getAllDecks = async (req: Request, res: Response) => {
    try {
        res.status(200).json({ message: "success" });
    } catch (error) {
        res.status(404).json({ message: "fail" });
    }
};
export const getDeck = async (req: Request, res: Response) => {
    try {
        res.status(200).json({ message: "success" });
    } catch (error) {
        res.status(404).json({ message: "fail" });
    }
};
export const createDeck = async (req: Request, res: Response) => {
    try {
        res.status(200).json({ message: "success" });
    } catch (error) {
        res.status(404).json({ message: "fail" });
    }
};
export const modifyDeck = async (req: Request, res: Response) => {
    try {
        res.status(200).json({ message: "success" });
    } catch (error) {
        res.status(404).json({ message: "fail" });
    }
};

export const deleteDeck = async (req: Request, res: Response) => {
    try {
        res.status(200).json({ message: "success" });
    } catch (error) {
        res.status(404).json({ message: "fail" });
    }
};
