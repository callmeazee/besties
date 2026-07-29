import { Response } from "express";
import { CatchError, TryError } from "../utils/error";
import { SessionInterface } from "../middleware/auth.middleware";
import PostModel from "../model/post.model";
import { downloadObject } from "../utils/s3";

const serializePost = async (post: any, sessionId?: string) => {
  const item = typeof post.toObject === "function" ? post.toObject() : post;
  const likeIds = (item.likes || []).map((id: unknown) => String(id));
  const dislikeIds = (item.dislikes || []).map((id: unknown) => String(id));

  // Generate download URL with 1 hour expiry (3600 seconds) for image previews
  let attachmentUrl = null;
  if (item.attachments) {
    try {
      attachmentUrl = await downloadObject(item.attachments, 3600);
    } catch {
      // If S3 download fails, use the raw S3 URL as fallback
      attachmentUrl = `${process.env.S3_URL}/${item.attachments}` || null;
    }
  }

  return {
    ...item,
    attachmentUrl,
    attachmentKey: item.attachments || null,
    likesCount: likeIds.length,
    dislikesCount: dislikeIds.length,
    commentsCount: item.comments?.length || 0,
    hasLiked: sessionId ? likeIds.includes(sessionId) : false,
    hasDisliked: sessionId ? dislikeIds.includes(sessionId) : false,
    isOwner: sessionId ? String(item.user?._id ?? item.user) === sessionId : false,
  };
};

const findSerializedPost = async (id: string, sessionId?: string) => {
  const post = await PostModel.findById(id)
    .populate("user", "fullname image email")
    .populate("comments.user", "fullname image email");

  if (!post) throw TryError("Post not found", 404);

  return serializePost(post, sessionId);
};

export const createPost = async (req: SessionInterface, res: Response) => {
  try {
    if (!req.session?.id) throw TryError("Unauthorized", 401);

    const userId = String(req.session.id);
    const content = String(req.body?.content ?? "").trim();

    if (!content && !req.body?.attachments) {
      throw TryError("Post content or image is required", 400);
    }

    const post = await PostModel.create({
      user: req.session.id,
      content: content || "Shared a photo",
      attachments: req.body?.attachments || null,
      type: req.body?.type || null,
    });

    res.json(await findSerializedPost(String(post._id), userId));
  } catch (err) {
    CatchError(err, res, "Failed to create post");
  }
};

export const fetchPosts = async (req: SessionInterface, res: Response) => {
  try {
    const sessionId = req.session?.id ? String(req.session.id) : undefined;
    const filter: Record<string, unknown> = {};

    // If ?mine=true, only fetch posts by the current user
    if (req.query?.mine === "true" && sessionId) {
      filter.user = sessionId;
    }

    const posts = await PostModel.find(filter)
      .populate("user", "fullname image email")
      .populate("comments.user", "fullname image email")
      .sort({ createdAt: -1 });

    res.json(await Promise.all(posts.map((post) => serializePost(post, sessionId))));
  } catch (err) {
    CatchError(err, res, "Failed to fetch posts");
  }
};

export const updatePost = async (req: SessionInterface, res: Response) => {
  try {
    if (!req.session?.id) throw TryError("Unauthorized", 401);

    const postId = String(req.params.id);
    const userId = String(req.session.id);
    const post = await PostModel.findById(postId);

    if (!post) throw TryError("Post not found", 404);
    if (String(post.user) !== userId) throw TryError("You can only edit your own post", 403);

    const content = String(req.body?.content ?? "").trim();

    if (!content && !post.attachments && !req.body?.attachments) {
      throw TryError("Post content or image is required", 400);
    }

    post.content = content || post.content;

    if (Object.prototype.hasOwnProperty.call(req.body, "attachments")) {
      post.attachments = req.body.attachments || null;
      post.type = req.body.type || null;
    }

    await post.save();
    res.json(await findSerializedPost(postId, userId));
  } catch (err) {
    CatchError(err, res, "Failed to update post");
  }
};

export const deletePost = async (req: SessionInterface, res: Response) => {
  try {
    if (!req.session?.id) throw TryError("Unauthorized", 401);

    const postId = String(req.params.id);
    const userId = String(req.session.id);
    const post = await PostModel.findById(postId);

    if (!post) throw TryError("Post not found", 404);
    if (String(post.user) !== userId) throw TryError("You can only delete your own post", 403);

    await post.deleteOne();
    res.json({ success: true, id: postId });
  } catch (err) {
    CatchError(err, res, "Failed to delete post");
  }
};

export const toggleLike = async (req: SessionInterface, res: Response) => {
  try {
    if (!req.session?.id) throw TryError("Unauthorized", 401);

    const postId = String(req.params.id);
    const post = await PostModel.findById(postId);
    if (!post) throw TryError("Post not found", 404);

    const userId = String(req.session.id);
    const hasLiked = post.likes.some((id) => String(id) === userId);

    post.likes = (hasLiked
      ? post.likes.filter((id) => String(id) !== userId)
      : [...post.likes.filter((id) => String(id) !== userId), req.session.id]) as never;
    post.dislikes = post.dislikes.filter((id) => String(id) !== userId) as never;

    await post.save();
    res.json(await findSerializedPost(postId, userId));
  } catch (err) {
    CatchError(err, res, "Failed to update like");
  }
};

export const toggleDislike = async (req: SessionInterface, res: Response) => {
  try {
    if (!req.session?.id) throw TryError("Unauthorized", 401);

    const postId = String(req.params.id);
    const post = await PostModel.findById(postId);
    if (!post) throw TryError("Post not found", 404);

    const userId = String(req.session.id);
    const hasDisliked = post.dislikes.some((id) => String(id) === userId);

    post.dislikes = (hasDisliked
      ? post.dislikes.filter((id) => String(id) !== userId)
      : [...post.dislikes.filter((id) => String(id) !== userId), req.session.id]) as never;
    post.likes = post.likes.filter((id) => String(id) !== userId) as never;

    await post.save();
    res.json(await findSerializedPost(postId, userId));
  } catch (err) {
    CatchError(err, res, "Failed to update dislike");
  }
};

export const createComment = async (req: SessionInterface, res: Response) => {
  try {
    if (!req.session?.id) throw TryError("Unauthorized", 401);

    const postId = String(req.params.id);
    const message = String(req.body?.message ?? "").trim();
    if (!message) throw TryError("Comment is required", 400);

    const post = await PostModel.findById(postId);
    if (!post) throw TryError("Post not found", 404);

    post.comments.push({
      user: req.session.id,
      message,
    } as never);

    await post.save();
    res.json(await findSerializedPost(postId, String(req.session.id)));
  } catch (err) {
    CatchError(err, res, "Failed to create comment");
  }
};

export const deleteComment = async (req: SessionInterface, res: Response) => {
  try {
    if (!req.session?.id) throw TryError("Unauthorized", 401);

    const postId = String(req.params.id);
    const commentId = String(req.params.commentId);
    const userId = String(req.session.id);

    const post = await PostModel.findById(postId);
    if (!post) throw TryError("Post not found", 404);

    const comment = (post.comments as any[]).find(
      (c: any) => String(c._id) === commentId
    );
    if (!comment) throw TryError("Comment not found", 404);
    if (String(comment.user) !== userId) throw TryError("You can only delete your own comment", 403);

    post.comments = post.comments.filter((c: any) => String(c._id) !== commentId) as never;

    await post.save();
    res.json(await findSerializedPost(postId, userId));
  } catch (err) {
    CatchError(err, res, "Failed to delete comment");
  }
};

