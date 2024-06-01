import mongoose from "mongoose";

const { Schema, model } = mongoose;

const publicationSchema = new Schema({
  content: {
    type: String,
    required: true,
  },
  attachment: {
    type: String,
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
  //add user id ref
  user_id: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: false,
  },
  likeCount: {
    type: Number,
    default: 0,
  },

});

export default model("Publication", publicationSchema);