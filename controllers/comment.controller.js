import Comment from "../models/comment.js";

// Create a new comment
export async function createComment(req, res) {
    const comment = new Comment(req.body);

    try {
        const newComment = await Comment.create(comment);

        res.status(201).json(newComment);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "An error occurred while creating the comment" });
    }
}

// Get all comments
export async function getAllComments(req, res) {
    Comment
        .find({})
        .then(docs => {
            res.status(200).json(docs);
        })
        .catch(err => {
            res.status(500).json({ error: err });
        });
}

// Get comment by id
export async function getCommentById(req, res) {
    try {
        const comment = await Comment.findById(req.params.id);
        
        if (!comment) { 
            return res.status(404).json({ message: "Comment not found" });
        }
        
        res.status(200).json(comment);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "An error occurred while searching for the comment" });
    }
}
