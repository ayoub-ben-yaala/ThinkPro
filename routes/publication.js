import express from "express";
import multer from 'multer';
const router = express.Router();



import { createPublication, getAllPublications, getPublicationById, updatePublication, deletePublication } from "../controllers/publication.js";
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, 'public/uploads'); // Destination folder relative to project root
    },
    filename: (req, file, cb) => {
      cb(null, `${Date.now()}-${file.originalname}`); // Unique file name
    }
});
const upload = multer({ storage: storage });



router.post("/publication", createPublication);
router.get("/publication/all", getAllPublications);
router.get("/publication/:id", getPublicationById);
router.put('/publication/:id', upload.single('attachment'), updatePublication);
router.delete("/publication/:id", deletePublication);

export default router;