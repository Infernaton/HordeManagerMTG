import express from "express";
import {
	createSection,
	deleteSection,
	getAllSections,
	getSection,
	modifySection,
} from "../controllers/sectionsController.js";
import { apiCall } from "../middleware/handler.js";

const router = express.Router();

router.get("/", (req, res) => apiCall(req, res, getAllSections));

router.get("/:id_section", (req, res) => apiCall(req, res, getSection));

router.post("/new", (req, res) => apiCall(req, res, createSection));
router.patch("/:id_section", (req, res) => apiCall(req, res, modifySection));

router.delete("/:id_section", (req, res) => apiCall(req, res, deleteSection));

export default router;
