import express from "express";
const router = express.Router();
import { createPublication, getAllPublications, getPublicationById } from "../controllers/publication.controller.js";

router.post("/publication", createPublication);
router.get("/publication/all", getAllPublications);
router.get("/publication/:id", getPublicationById);

export default router;