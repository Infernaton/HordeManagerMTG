import express from "express";
import {
	createSection,
	deleteSection,
	getAllSections,
	getSection,
	modifySection,
} from "../controllers/sectionsController.js";

const router = express.Router();

router.get("/", getAllSections);
router.get("/:id", getSection);

router.post("/new", createSection);
router.patch("/:id", modifySection);

router.delete("/:id", deleteSection);

export default router;
