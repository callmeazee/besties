import { Router } from "express";
import {
  createComment,
  createPost,
  deleteComment,
  deletePost,
  fetchPosts,
  toggleDislike,
  toggleLike,
  updatePost,
} from "../controller/post.controller";

const PostRouter = Router();

PostRouter.post("/", createPost);
PostRouter.get("/", fetchPosts);
PostRouter.put("/:id", updatePost);
PostRouter.delete("/:id", deletePost);
PostRouter.put("/:id/like", toggleLike);
PostRouter.put("/:id/dislike", toggleDislike);
PostRouter.post("/:id/comment", createComment);
PostRouter.delete("/:id/comment/:commentId", deleteComment);

export default PostRouter;
