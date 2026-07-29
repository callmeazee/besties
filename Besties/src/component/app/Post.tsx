import { useContext, useMemo, useRef, useState, type ChangeEvent } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import moment from "moment";
import useSWR from "swr";
import { v4 as uuid } from "uuid";

import Context from "../../Context";
import Fetcher from "../../lib/Fetcher";
import HttpInterceptor from "../../lib/HttpInterceptor";
import CatchError from "../../lib/CatchError";
import Card from "../shared/Card";
import Loader from "../shared/Loader";
import NotFound from "../shared/NotFound";

interface FeedUser {
  _id?: string;
  id?: string;
  fullname?: string;
  email?: string;
  image?: string | null;
}

interface FeedComment {
  _id?: string;
  user?: FeedUser;
  message: string;
  createdAt?: string;
}

interface FeedPost {
  _id: string;
  user?: FeedUser | string;
  content: string;
  type?: string | null;
  attachmentUrl?: string | null;
  attachmentKey?: string | null;
  likesCount?: number;
  dislikesCount?: number;
  commentsCount?: number;
  hasLiked?: boolean;
  hasDisliked?: boolean;
  isOwner?: boolean;
  comments?: FeedComment[];
  createdAt?: string;
}

const getUserId = (user?: FeedUser | string | null) => {
  if (!user) return "";
  if (typeof user === "string") return user;

  return user.id ?? user._id ?? "";
};

const initialsFor = (name = "") =>
  name
    .trim()
    .split(/\s+/)
    .map((part) => part[0] ?? "")
    .join("")
    .toUpperCase()
    .slice(0, 2) || "??";

const authorName = (user?: FeedUser | string) =>
  typeof user === "object" && user?.fullname ? user.fullname : "Besties User";

const Avatar = ({
  user,
  size = "md",
}: {
  user?: FeedUser | string;
  size?: "sm" | "md";
}) => {
  const profile = typeof user === "object" ? user : undefined;
  const name = authorName(user);
  const className = size === "sm" ? "w-8 h-8 text-[11px]" : "w-11 h-11 text-sm";

  return (
    <div
      className={`${className} rounded-full overflow-hidden bg-linear-to-tr from-blue-500 to-indigo-600 text-white flex items-center justify-center font-bold shrink-0 shadow-sm`}>
      {profile?.image ? (
        <img src={profile.image} alt={name} className="w-full h-full object-cover" />
      ) : (
        initialsFor(name)
      )}
    </div>
  );
};

interface PostProps {
  mode?: "all" | "my";
}

const Post = ({ mode = "my" }: PostProps) => {
  const { session } = useContext(Context);
  const navigate = useNavigate();
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const fetcherUrl = mode === "all" ? "/post" : "/post?mine=true";
  const { data, error, isLoading, mutate } = useSWR<FeedPost[]>(fetcherUrl, Fetcher, {
    shouldRetryOnError: false,
  });

  const [content, setContent] = useState("");
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [publishing, setPublishing] = useState(false);
  const [expandedComments, setExpandedComments] = useState<Record<string, boolean>>({});
  const [commentDrafts, setCommentDrafts] = useState<Record<string, string>>({});
  const [busyPostId, setBusyPostId] = useState<string | null>(null);
  const [editingPostId, setEditingPostId] = useState<string | null>(null);
  const [editContent, setEditContent] = useState("");

  const posts = useMemo(() => data ?? [], [data]);
  const trimmedContent = content.trim();
  const canPublish = Boolean(trimmedContent || selectedImage) && !publishing;
  const sessionId = getUserId(session);

  if (isLoading) return <Loader />;
  if (error) return <NotFound />;

  const replacePost = (updated: FeedPost) => {
    mutate((current = []) => current.map((post) => (post._id === updated._id ? updated : post)), {
      revalidate: false,
    });
  };

  const pickImage = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith("image/")) {
      CatchError(new Error("Please select an image file."));
      return;
    }

    if (previewUrl) URL.revokeObjectURL(previewUrl);

    setSelectedImage(file);
    setPreviewUrl(URL.createObjectURL(file));
  };

  const clearImage = () => {
    if (previewUrl) URL.revokeObjectURL(previewUrl);

    setSelectedImage(null);
    setPreviewUrl(null);

    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const uploadSelectedImage = async () => {
    if (!selectedImage) return { attachments: null, type: null };

    const ext = selectedImage.name.split(".").pop() || "png";
    const attachments = `posts/${uuid()}.${ext}`;
    const type = selectedImage.type || "image/png";

    const { data: uploadData } = await HttpInterceptor.post("/storage/upload", {
      path: attachments,
      type,
      status: "public-read",
    });

    await axios.put(uploadData.url, selectedImage, {
      headers: {
        "Content-Type": type,
      },
    });

    return { attachments, type };
  };

  const createPost = async () => {
    if (!canPublish) return;

    setPublishing(true);

    try {
      const { attachments, type } = await uploadSelectedImage();
      const { data: newPost } = await HttpInterceptor.post("/post", {
        content: trimmedContent,
        attachments,
        type,
      });

      mutate((current = []) => [newPost, ...current], { revalidate: false });
      setContent("");
      clearImage();
    } catch (err) {
      CatchError(err);
    } finally {
      setPublishing(false);
    }
  };

  const toggleReaction = async (postId: string, action: "like" | "dislike") => {
    if (busyPostId) return;

    setBusyPostId(postId);

    try {
      const { data: updatedPost } = await HttpInterceptor.put(`/post/${postId}/${action}`);
      replacePost(updatedPost);
    } catch (err) {
      CatchError(err);
    } finally {
      setBusyPostId(null);
    }
  };

  const startEdit = (post: FeedPost) => {
    setEditingPostId(post._id);
    setEditContent(post.content);
  };

  const cancelEdit = () => {
    setEditingPostId(null);
    setEditContent("");
  };

  const saveEdit = async (postId: string) => {
    const contentToSave = editContent.trim();
    if (!contentToSave || busyPostId) return;

    setBusyPostId(postId);

    try {
      const { data: updatedPost } = await HttpInterceptor.put(`/post/${postId}`, {
        content: contentToSave,
      });

      replacePost(updatedPost);
      cancelEdit();
    } catch (err) {
      CatchError(err);
    } finally {
      setBusyPostId(null);
    }
  };

  const deletePost = async (postId: string) => {
    if (busyPostId || !window.confirm("Delete this post?")) return;

    setBusyPostId(postId);

    try {
      await HttpInterceptor.delete(`/post/${postId}`);
      mutate((current = []) => current.filter((post) => post._id !== postId), {
        revalidate: false,
      });
    } catch (err) {
      CatchError(err);
    } finally {
      setBusyPostId(null);
    }
  };

  const sendComment = async (postId: string) => {
    const message = String(commentDrafts[postId] ?? "").trim();
    if (!message || busyPostId) return;

    setBusyPostId(postId);

    try {
      const { data: updatedPost } = await HttpInterceptor.post(`/post/${postId}/comment`, {
        message,
      });

      replacePost(updatedPost);
      setCommentDrafts((prev) => ({ ...prev, [postId]: "" }));
      setExpandedComments((prev) => ({ ...prev, [postId]: true }));
    } catch (err) {
      CatchError(err);
    } finally {
      setBusyPostId(null);
    }
  };

  const deleteComment = async (postId: string, commentId: string) => {
    if (busyPostId || !window.confirm("Delete this comment?")) return;

    setBusyPostId(postId);

    try {
      const { data: updatedPost } = await HttpInterceptor.delete(`/post/${postId}/comment/${commentId}`);
      replacePost(updatedPost);
    } catch (err) {
      CatchError(err);
    } finally {
      setBusyPostId(null);
    }
  };

  return (
    <div className="w-full min-w-0 space-y-5 pb-6">
      <Card className="bg-white border border-gray-100 shadow-sm">
        <div className="space-y-4">
          <div className="flex items-start gap-3">
            <Avatar user={session} />
            <div className="flex-1 min-w-0">
              <textarea
                value={content}
                onChange={(e) => setContent(e.target.value)}
                placeholder="Share something with your friends..."
                rows={4}
                className="w-full resize-none rounded-2xl border border-slate-100 bg-slate-50 px-4 py-3 text-sm text-slate-700 outline-none transition focus:border-blue-200 focus:bg-white"
              />
            </div>
          </div>

          {previewUrl && (
            <div className="relative overflow-hidden rounded-2xl border border-slate-100 bg-slate-50">
              <img src={previewUrl} alt="Selected post" className="max-h-96 w-full object-cover" />
              <div className="absolute left-3 top-3 rounded-full bg-black/60 px-3 py-1 text-xs font-bold text-white">
                {selectedImage?.name}
              </div>
              <button
                type="button"
                onClick={clearImage}
                className="absolute right-3 top-3 inline-flex h-9 w-9 items-center justify-center rounded-full bg-black/60 text-white transition hover:bg-black/75"
                title="Remove image">
                <i className="ri-close-line text-xl" />
              </button>
            </div>
          )}

          <div className="flex flex-wrap items-center justify-between gap-3 border-t border-slate-100 pt-3">
            <div className="flex items-center gap-2">
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                onChange={pickImage}
                className="hidden"
              />
              <button
                type="button"
                onClick={() => fileInputRef.current?.click()}
                className="inline-flex h-10 items-center gap-2 rounded-xl border border-slate-100 bg-slate-50 px-3 text-xs font-bold text-slate-600 transition hover:border-blue-100 hover:bg-blue-50 hover:text-blue-600">
                <i className="ri-image-add-line text-lg" />
                Photo
              </button>
              <span className="hidden sm:inline text-xs text-slate-400">
                Add text, a photo, or both.
              </span>
            </div>

            <button
              type="button"
              onClick={createPost}
              disabled={!canPublish}
              className="inline-flex h-10 items-center gap-2 rounded-xl bg-blue-600 px-5 text-sm font-bold text-white shadow-sm transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:bg-slate-200 disabled:text-slate-400">
              <i className={publishing ? "ri-loader-4-line animate-spin" : "ri-send-plane-fill"} />
              {publishing ? "Publishing" : "Post"}
            </button>
          </div>
        </div>
      </Card>

      {posts.length === 0 ? (
        <div className="rounded-2xl border border-dashed border-slate-200 bg-white p-10 text-center">
          <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-blue-50 text-blue-600">
            <i className="ri-newspaper-line text-2xl" />
          </div>
          <h3 className="text-sm font-bold text-slate-800">No posts yet</h3>
          <p className="mt-1 text-sm text-slate-400">Create the first update for your feed.</p>
        </div>
      ) : (
        <div className="space-y-5">
          {posts.map((post) => {
            const commentsOpen = Boolean(expandedComments[post._id]);
            const comments = post.comments ?? [];
            const owner = post.isOwner || getUserId(post.user) === sessionId;
            const editing = editingPostId === post._id;

            return (
              <Card key={post._id} className="bg-white border border-gray-100 shadow-sm">
                <article className="space-y-4">
                  <header className="flex items-start justify-between gap-3">
                    <div className="flex items-center gap-3 min-w-0">
                      <button type="button" onClick={() => navigate(`/app/profile/${getUserId(post.user)}`)} className="shrink-0">
                        <Avatar user={post.user} />
                      </button>
                      <div className="min-w-0">
                        <button
                          type="button"
                          onClick={() => navigate(`/app/profile/${getUserId(post.user)}`)}
                          className="truncate text-sm font-bold capitalize text-slate-900 hover:text-blue-600 transition">
                          {authorName(post.user)}
                        </button>
                        <p className="text-xs text-slate-400">
                          {post.createdAt ? moment(post.createdAt).fromNow() : "Just now"}
                        </p>
                      </div>
                    </div>

                    {owner && (
                      <div className="flex items-center gap-1">
                        <button
                          type="button"
                          onClick={() => startEdit(post)}
                          className="inline-flex h-9 w-9 items-center justify-center rounded-xl text-slate-400 transition hover:bg-blue-50 hover:text-blue-600"
                          title="Edit post">
                          <i className="ri-edit-line text-lg" />
                        </button>
                        <button
                          type="button"
                          onClick={() => deletePost(post._id)}
                          disabled={busyPostId === post._id}
                          className="inline-flex h-9 w-9 items-center justify-center rounded-xl text-slate-400 transition hover:bg-rose-50 hover:text-rose-600"
                          title="Delete post">
                          <i className="ri-delete-bin-6-line text-lg" />
                        </button>
                      </div>
                    )}
                  </header>

                  {editing ? (
                    <div className="space-y-3">
                      <textarea
                        value={editContent}
                        onChange={(e) => setEditContent(e.target.value)}
                        rows={4}
                        className="w-full resize-none rounded-2xl border border-blue-100 bg-blue-50/40 px-4 py-3 text-sm text-slate-700 outline-none focus:border-blue-300 focus:bg-white"
                      />
                      <div className="flex justify-end gap-2">
                        <button
                          type="button"
                          onClick={cancelEdit}
                          className="inline-flex h-9 items-center rounded-xl px-4 text-sm font-bold text-slate-500 transition hover:bg-slate-50">
                          Cancel
                        </button>
                        <button
                          type="button"
                          onClick={() => saveEdit(post._id)}
                          disabled={!editContent.trim() || busyPostId === post._id}
                          className="inline-flex h-9 items-center rounded-xl bg-blue-600 px-4 text-sm font-bold text-white transition hover:bg-blue-700 disabled:bg-slate-200 disabled:text-slate-400">
                          Save
                        </button>
                      </div>
                    </div>
                  ) : (
                    <p className="whitespace-pre-wrap break-words text-sm leading-6 text-slate-700">
                      {post.content}
                    </p>
                  )}

                  {post.attachmentUrl && post.type?.startsWith("image/") && (
                    <div className="overflow-hidden rounded-2xl border border-slate-100 bg-slate-50">
                      <img
                        src={post.attachmentUrl}
                        alt="Post attachment"
                        className="max-h-[520px] w-full object-cover"
                      />
                    </div>
                  )}

                  <div className="flex items-center justify-between border-y border-slate-100 py-2 text-xs text-slate-400">
                    <span>
                      {post.likesCount ?? 0} likes • {post.dislikesCount ?? 0} dislikes
                    </span>
                    <button
                      type="button"
                      onClick={() =>
                        setExpandedComments((prev) => ({
                          ...prev,
                          [post._id]: !prev[post._id],
                        }))
                      }
                      className="font-semibold transition hover:text-blue-600">
                      {post.commentsCount ?? comments.length} comments
                    </button>
                  </div>

                  <div className="grid grid-cols-3 gap-2">
                    <button
                      type="button"
                      onClick={() => toggleReaction(post._id, "like")}
                      disabled={busyPostId === post._id}
                      className={`inline-flex h-10 items-center justify-center gap-2 rounded-xl text-sm font-bold transition ${
                        post.hasLiked
                          ? "bg-blue-50 text-blue-600"
                          : "text-slate-500 hover:bg-slate-50 hover:text-blue-600"
                      }`}>
                      <i className={post.hasLiked ? "ri-thumb-up-fill" : "ri-thumb-up-line"} />
                      Like
                    </button>
                    <button
                      type="button"
                      onClick={() => toggleReaction(post._id, "dislike")}
                      disabled={busyPostId === post._id}
                      className={`inline-flex h-10 items-center justify-center gap-2 rounded-xl text-sm font-bold transition ${
                        post.hasDisliked
                          ? "bg-rose-50 text-rose-600"
                          : "text-slate-500 hover:bg-slate-50 hover:text-rose-600"
                      }`}>
                      <i className={post.hasDisliked ? "ri-thumb-down-fill" : "ri-thumb-down-line"} />
                      Dislike
                    </button>
                    <button
                      type="button"
                      onClick={() =>
                        setExpandedComments((prev) => ({
                          ...prev,
                          [post._id]: !prev[post._id],
                        }))
                      }
                      className="inline-flex h-10 items-center justify-center gap-2 rounded-xl text-sm font-bold text-slate-500 transition hover:bg-slate-50 hover:text-indigo-600">
                      <i className="ri-chat-3-line" />
                      Comment
                    </button>
                  </div>

                  {commentsOpen && (
                    <section className="space-y-3 rounded-2xl bg-slate-50 p-3">
                      <div className="flex items-center gap-2">
                        <Avatar user={session} size="sm" />
                        <div className="flex min-w-0 flex-1 items-center rounded-xl border border-slate-100 bg-white px-3">
                          <input
                            value={commentDrafts[post._id] ?? ""}
                            onChange={(e) =>
                              setCommentDrafts((prev) => ({
                                ...prev,
                                [post._id]: e.target.value,
                              }))
                            }
                            onKeyDown={(e) => {
                              if (e.key === "Enter") sendComment(post._id);
                            }}
                            placeholder="Write a comment..."
                            className="h-10 min-w-0 flex-1 bg-transparent text-sm text-slate-700 outline-none"
                          />
                          <button
                            type="button"
                            onClick={() => sendComment(post._id)}
                            className="text-blue-600 transition hover:text-blue-700"
                            title="Send comment">
                            <i className="ri-send-plane-2-fill text-lg" />
                          </button>
                        </div>
                      </div>

                      {comments.length > 0 && (
                        <div className="space-y-3">
                          {comments.slice(-4).map((comment, index) => {
                            const isCommentOwner = getUserId(comment.user) === sessionId;
                            return (
                              <div key={comment._id ?? index} className="flex gap-2">
                                <Avatar user={comment.user} size="sm" />
                                <div className="min-w-0 flex-1 rounded-2xl bg-white px-3 py-2 shadow-sm">
                                  <div className="flex flex-wrap items-center gap-2">
                                    <span className="text-xs font-bold capitalize text-slate-800">
                                      {authorName(comment.user)}
                                    </span>
                                    <span className="text-[10px] text-slate-400">
                                      {comment.createdAt ? moment(comment.createdAt).fromNow() : "now"}
                                    </span>
                                    {isCommentOwner && (
                                      <button
                                        type="button"
                                        onClick={() => deleteComment(post._id, comment._id!)}
                                        disabled={busyPostId === post._id}
                                        className="ml-auto inline-flex h-6 w-6 items-center justify-center rounded-lg text-slate-400 transition hover:bg-rose-50 hover:text-rose-600"
                                        title="Delete comment">
                                        <i className="ri-delete-bin-6-line text-sm" />
                                      </button>
                                    )}
                                  </div>
                                  <p className="mt-1 break-words text-sm text-slate-600">
                                    {comment.message}
                                  </p>
                                </div>
                              </div>
                            );
                          })}
                        </div>
                      )}
                    </section>
                  )}
                </article>
              </Card>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default Post;

