import mongoose from "mongoose";

 const commentSchema = new mongoose.Schema({
   Text: {
    type: String,
    required: true,
 },
 created_at: {
  type: Date,
  required: true,
  default: Date.now,
},
updated_at: {
  type: Date,
  required: true,
  default: Date.now,
},
likeCount: {
  type: Number,
  default: 0,
},  
dislikeCount: {
  type: Number,
  default: 0,
},  
 user_id: {
     type: mongoose.Schema.Types.ObjectId,
     ref: "User",
     required: true,
   },
 });

 export default model("Comment", commentSchema);
