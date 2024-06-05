import express from "express";
const router = express.Router();
import { createPublication, getAllPublications, getPublicationById, updatePublication, deletePublication } from "../controllers/publication.js";

router.post("/publication", createPublication);
router.get("/publication/all", getAllPublications);
router.get("/publication/:id", getPublicationById);
router.put("/publication/:id", updatePublication);
router.delete("/publication/:id", deletePublication);

export default router;