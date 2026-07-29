import { useContext, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import moment from "moment";
import useSWR from "swr";
import { notification } from "antd";

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

interface ProfileData {
  user: {
    _id: string;
    fullname: string;
    image: string | null;
    email: string;
    createdAt: string;
  };
  posts: FeedPost[];
  followersCount: number;
  followingCount: number;
  friendStatus: "none" | "pending" | "following" | "requested";
  friendRequestId: string | null;
  isOwnProfile: boolean;
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

const Profile = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { session } = useContext(Context);

  const { data, error, isLoading, mutate } = useSWR<ProfileData>(
    `/auth/profile/${id}`,
    Fetcher,
    { shouldRetryOnError: false }
  );

  const [expandedComments, setExpandedComments] = useState<Record<string, boolean>>({});
  const [commentDrafts, setCommentDrafts] = useState<Record<string, string>>({});
  const [busyPostId, setBusyPostId] = useState<string | null>(null);

  const sessionId = getUserId(session);

  if (isLoading) return <Loader />;
  if (error) return <NotFound />;
  if (!data) return <NotFound />;

  const { user, posts, followersCount, followingCount, friendStatus, friendRequestId, isOwnProfile } = data;

  const replacePost = (updated: FeedPost) => {
    mutate((current) => {
      if (!current) return current;
      return {
        ...current,
        posts: current.posts.map((post) =>
          post._id === updated._id ? updated : post
        ),
      };
    }, { revalidate: false });
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

  const sendComment = async (postId: string) => {
    const message = String(commentDrafts[postId] ?? "").trim();
    if (!message || busyPostId) return;
    setBusyPostId(postId);
    try {
      const { data: updatedPost } = await HttpInterceptor.post(`/post/${postId}/comment`, { message });
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

  const handleFollowAction = async () => {
    if (friendStatus === "following") {
      // Confirm unfollow
      if (!window.confirm(`Unfollow ${user.fullname}?`)) return;
      if (friendRequestId) {
        try {
          await HttpInterceptor.delete(`/friend/${friendRequestId}`);
          mutate((current) => current ? { ...current, friendStatus: "none", friendRequestId: null, followersCount: Math.max(0, current.followersCount - 1) } : current, { revalidate: false });
          notification.success({
            message: "Unfollowed",
            description: `You are no longer friends with ${user.fullname}`,
            placement: "topRight",
          });
        } catch (err) {
          CatchError(err);
        }
      }
    } else if (friendStatus === "requested") {
      // Accept friend request (status "requested" means they sent it to you)
      if (friendRequestId) {
        try {
          await HttpInterceptor.put(`/friend/${friendRequestId}`, { status: "accepted" });
          mutate((current) => current ? { ...current, friendStatus: "following", followersCount: current.followersCount + 1 } : current, { revalidate: false });
          notification.success({
            message: "Friend Request Accepted",
            description: `You are now friends with ${user.fullname}`,
            placement: "topRight",
          });
        } catch (err) {
          CatchError(err);
        }
      }
    } else if (friendStatus === "none") {
      // Send friend request
      try {
        await HttpInterceptor.post("/friend", { friend: id });
        // After sending request, re-fetch to get the proper friendRequestId
        mutate();
        notification.success({
          message: "Friend Request Sent",
          description: `Friend request sent to ${user.fullname}`,
          placement: "topRight",
        });
      } catch (err) {
        CatchError(err);
      }
    }
  };

  const getFollowButton = () => {
    if (isOwnProfile) return null;

    if (friendStatus === "following") {
      return (
        <button
          type="button"
          onClick={handleFollowAction}
          className="inline-flex h-10 items-center gap-2 rounded-xl border border-slate-200 bg-white px-5 text-sm font-bold text-slate-600 shadow-sm transition hover:bg-rose-50 hover:text-rose-600 hover:border-rose-200">
          <i className="ri-user-unfollow-line" />
          Following
        </button>
      );
    }

    if (friendStatus === "pending") {
      return (
        <button
          type="button"
          disabled
          className="inline-flex h-10 items-center gap-2 rounded-xl border border-slate-200 bg-slate-50 px-5 text-sm font-bold text-slate-400 shadow-sm cursor-not-allowed">
          <i className="ri-hourglass-line" />
          Pending
        </button>
      );
    }

    if (friendStatus === "requested") {
      return (
        <button
          type="button"
          onClick={handleFollowAction}
          className="inline-flex h-10 items-center gap-2 rounded-xl bg-green-600 px-5 text-sm font-bold text-white shadow-sm transition hover:bg-green-700">
          <i className="ri-user-add-line" />
          Accept Request
        </button>
      );
    }

    // none
    return (
      <button
        type="button"
        onClick={handleFollowAction}
        className="inline-flex h-10 items-center gap-2 rounded-xl bg-blue-600 px-5 text-sm font-bold text-white shadow-sm transition hover:bg-blue-700">
        <i className="ri-user-follow-line" />
        Follow
      </button>
    );
  };

  return (
    <div className="w-full min-w-0 space-y-5 pb-6">
      {/* Profile Header */}
      <Card className="bg-white border border-gray-100 shadow-sm overflow-hidden">
        {/* Cover Banner */}
        <div className="h-32 bg-linear-to-r from-blue-500 via-indigo-500 to-purple-600" />

        <div className="px-6 pb-6">
          {/* Avatar + Actions */}
          <div className="flex flex-wrap items-end justify-between -mt-12 mb-4">
            <div className="flex items-end gap-4">
              <div className="w-24 h-24 rounded-full border-4 border-white overflow-hidden bg-linear-to-tr from-blue-500 to-indigo-600 text-white flex items-center justify-center font-bold text-2xl shadow-lg shrink-0">
                {user.image ? (
                  <img src={user.image} alt={user.fullname} className="w-full h-full object-cover" />
                ) : (
                  initialsFor(user.fullname)
                )}
              </div>
              <div className="pb-1 min-w-0">
                <h1 className="text-xl font-bold text-slate-900 capitalize truncate">
                  {user.fullname}
                </h1>
                <p className="text-sm text-slate-400">
                  Joined {user.createdAt ? moment(user.createdAt).format("MMM YYYY") : "recently"}
                </p>
              </div>
            </div>

            {getFollowButton()}
          </div>

          {/* Stats */}
          <div className="flex items-center gap-8">
            <div className="text-center">
              <span className="block text-lg font-bold text-slate-900">{posts.length}</span>
              <span className="text-xs text-slate-400">Posts</span>
            </div>
            <div className="text-center">
              <span className="block text-lg font-bold text-slate-900">{followersCount}</span>
              <span className="text-xs text-slate-400">Followers</span>
            </div>
            <div className="text-center">
              <span className="block text-lg font-bold text-slate-900">{followingCount}</span>
              <span className="text-xs text-slate-400">Following</span>
            </div>
          </div>
        </div>
      </Card>

      {/* User's Posts */}
      <h2 className="text-sm font-bold uppercase tracking-wide text-slate-500 px-1">Posts</h2>

      {posts.length === 0 ? (
        <div className="rounded-2xl border border-dashed border-slate-200 bg-white p-10 text-center">
          <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-blue-50 text-blue-600">
            <i className="ri-newspaper-line text-2xl" />
          </div>
          <h3 className="text-sm font-bold text-slate-800">No posts yet</h3>
          <p className="mt-1 text-sm text-slate-400">This user hasn't posted anything yet.</p>
        </div>
      ) : (
        <div className="space-y-5">
          {posts.map((post) => {
            const commentsOpen = Boolean(expandedComments[post._id]);
            const comments = post.comments ?? [];

            return (
              <Card key={post._id} className="bg-white border border-gray-100 shadow-sm">
                <article className="space-y-4">
                  <header className="flex items-start justify-between gap-3">
                    <div className="flex items-center gap-3 min-w-0">
                      <button
                        type="button"
                        onClick={() => navigate(`/app/profile/${getUserId(post.user)}`)}
                        className="shrink-0">
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
                  </header>

                  <p className="whitespace-pre-wrap break-words text-sm leading-6 text-slate-700">
                    {post.content}
                  </p>

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

export default Profile;