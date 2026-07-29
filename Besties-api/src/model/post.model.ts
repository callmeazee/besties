import mongoose, { model, Schema } from "mongoose";

const commentSchema = new Schema(
  {
    user: {
      type: mongoose.Types.ObjectId,
      ref: "Auth",
      required: true,
    },
    message: {
      type: String,
      required: true,
      trim: true,
    },
  },
  { timestamps: true },
);

const postSchema = new Schema(
  {
    user: {
      type: mongoose.Types.ObjectId,
      ref: "Auth",
      required: true,
    },
    attachments: {
      type: String,
      default: null,
    },
    type: {
      type: String,
      default: null,
    },
    content: {
      type: String,
      required: true,
      trim: true,
    },
    likes: [
      {
        type: mongoose.Types.ObjectId,
        ref: "Auth",
      },
    ],
    dislikes: [
      {
        type: mongoose.Types.ObjectId,
        ref: "Auth",
      },
    ],
    comments: [commentSchema],
  },
  { timestamps: true },
);

const PostModel = model("Post", postSchema);

export default PostModel;
