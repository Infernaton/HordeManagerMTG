import type { Request, Response } from "express";

export const getAllPhases = async (req: Request, res: Response) => {
    try {
        res.status(200).json({ message: "success" });
    } catch (error) {
        res.status(404).json({ message: "fail" });
    }
};
export const getPhase = async (req: Request, res: Response) => {
    try {
        res.status(200).json({ message: "success" });
    } catch (error) {
        res.status(404).json({ message: "fail" });
    }
};
export const createPhase = async (req: Request, res: Response) => {
    try {
        res.status(200).json({ message: "success" });
    } catch (error) {
        res.status(404).json({ message: "fail" });
    }
};
export const modifyPhase = async (req: Request, res: Response) => {
    try {
        res.status(200).json({ message: "success" });
    } catch (error) {
        res.status(404).json({ message: "fail" });
    }
};

export const deletePhase = async (req: Request, res: Response) => {
    try {
        res.status(200).json({ message: "success" });
    } catch (error) {
        res.status(404).json({ message: "fail" });
    }
};
