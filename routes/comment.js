import express from "express";
const router = express.Router();
import { createComment, getAllComments, getCommentById, updateComment , deleteComment} from "../controllers/comment.js";

router.post("/comment", createComment);
router.get("/comment/all", getAllComments);
router.get("/comment/:id", getCommentById);
router.put("/comment/:id", updateComment);
router.delete("/comment/:id", deleteComment);


export default router;