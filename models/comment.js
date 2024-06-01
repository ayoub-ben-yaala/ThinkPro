import mongoose from "mongoose";

import { model } from "mongoose";

 const commentSchema = new mongoose.Schema({
   body: {
    type: String,
    required: false,
 },
 created_at: {
  type: Date,
  required: false,
  default: Date.now,
},
updated_at: {
  type: Date,
  required: false,
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
     required: false,
   },
 });

 export default model("Comment", commentSchema);
