import Comment from "../models/comment.js";
import Publication from "../models/publication.js";
import Notification from "../models/notification.js";

// Create a new comment
export async function createComment(req, res) {
  const comment = new Comment(req.body);

  try {
    const newComment = await Comment.create(comment);

    // Find the publication to get the author
    const publication = await Publication.findById(req.body.publication_id);
    if (publication) {
      // Create a notification for the author of the publication
      await Notification.create({
        user_id: publication.user_id,
        content: `New comment on your publication: ${newComment.Text}`,
      });
    }

    res.status(201).json(newComment);
  } catch (err) {
    console.error(err);
    res
      .status(500)
      .json({ error: "An error occurred while creating the comment" });
  }
}

// Get all comments
export async function getAllComments(req, res) {
    try {
        const comments = await Comment.find();
        // Checking dislike count for comments
        comments.forEach(async (comment) => {
          if (comment.dislikeCount > 10) {
            comment.body = "This comment has received a lot of dislikes.";
            await comment.save();
          }
        });
        console.log("Checked and updated dislike counts for comments");
        // Returning comments as JSON response
        res.status(200).json(comments);
      } catch (error) {
        console.error(
          "An error occurred while checking and updating dislike counts",
          error
        );
        res.status(500).json({ error: "An error occurred while retrieving comments" });
      }
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
    res
      .status(500)
      .json({ error: "An error occurred while searching for the comment" });
  }
}

// Update comment by id
export async function updateComment(req, res) {
  try {
    const comment = await Comment.findByIdAndUpdate(req.params.id, req.body, {new: true});
    if (!comment) {
      return res.status(404).json({ message: "Comment not found" });
    }
    res.status(200).json(comment);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "An error occurred while updating the comment" });
  }
}

// Delete comment by id
export async function deleteComment(req, res) {
  try {
    const comment = await Comment.findByIdAndDelete(req.params.id);

    if (!comment) {
      return res.status(404).json({ message: "Comment not found" });
    }

    res.status(200).json({ message: "Comment deleted successfully" });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ error: "An error occurred while deleting the comment" });
  }
}
