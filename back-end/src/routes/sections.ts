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
router.get("/:id_section", getSection);

router.post("/new", createSection);
router.patch("/:id_section", modifySection);

router.delete("/:id_section", deleteSection);

export default router;
