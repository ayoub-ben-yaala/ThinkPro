import express from "express";
const router = express.Router();
import { createComment, getAllComments, getCommentById } from "../controllers/comment.controller.js";

router.post("/comment", createComment);
router.get("/comment/all", getAllComments);
router.get("/comment/:id", getCommentById);

export default router;
