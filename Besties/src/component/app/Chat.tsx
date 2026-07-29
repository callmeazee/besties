/* eslint-disable react-hooks/set-state-in-effect */
/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
  type ChangeEvent,
  type FC,
} from "react";
// eslint-disable-next-line @typescript-eslint/no-explicit-any
import { Link, useLocation, useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import moment from "moment";
import useSWR from "swr";
import { v4 as uuid } from "uuid";

import Context from "../../Context";
import socket from "../../lib/socket";
import Fetcher from "../../lib/Fetcher";
import CatchError from "../../lib/CatchError";
import HttpInterceptor from "../../lib/HttpInterceptor";


interface ChatUser {
  fullname?: string;
  id?: string;
  _id?: string;
  image?: string | null;
}

interface AttachmentMeta {
  path: string;
  type: string;
  key?: string;
  name?: string;
}

interface MessageReceived {
  _id?: string;
  from: ChatUser;
  to?: string;
  message: string;
  time?: string;
  createdAt?: string;
  file?: AttachmentMeta;
}

interface ActiveUserType {
  fullname?: string;
  name?: string;
  initials?: string;
  status?: string;
  image?: string | null;
  id?: string;
  _id?: string;
}

interface PendingAttachment {
  file: File;
  previewUrl: string;
  filename: string;
  path: string;
  type: string;
}

interface Conversation {
  otherUser: {
    _id?: string;
    fullname?: string;
    image?: string | null;
  };
  lastMessage: string;
  lastMessageTime: string;
  hasFile: boolean;
  fileName: string | null;
}

interface UnreadMap {
  [userId: string]: number;
}

const getUserId = (user?: ChatUser | null) => user?.id ?? user?._id ?? "";

const getName = (user?: any) => user?.fullname ?? user?.name ?? "";

const getInitials = (name: string = "") =>
  name
    .trim()
    .split(/\s+/)
    .map((item) => item[0] ?? "")
    .join("")
    .toUpperCase()
    .slice(0, 2) || "??";

const AttachmentUi: FC<{ file: AttachmentMeta }> = ({ file }) => {
  const [loadError, setLoadError] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);

  if (loadError || !file.path) {
    return (
      <div className="flex items-center gap-2 p-2 bg-slate-100 rounded-lg text-slate-500">
        <i className="ri-file-download-line text-lg" />
        <span className="text-xs">{file.name ?? "Attachment not available"}</span>
      </div>
    );
  }

  if (file.type.startsWith("image/")) {
    return (
      <div className="relative">
        {!isLoaded && (
          <div className="flex items-center justify-center h-32 bg-slate-100 rounded-lg">
            <i className="ri-loader-4-line animate-spin text-slate-400 text-xl"></i>
          </div>
        )}
        <img
          className={`w-full rounded-lg max-h-48 object-cover ${isLoaded ? "block" : "hidden"}`}
          src={file.path}
          alt={file.name ?? "attachment"}
          onLoad={() => setIsLoaded(true)}
          onError={() => setLoadError(true)}
        />
      </div>
    );
  }

  if (file.type.startsWith("video/")) {
    return (
      <video className="w-full rounded-lg max-h-48" controls preload="metadata">
        <source src={file.path} type={file.type} />
      </video>
    );
  }

  return (
    <div className="flex items-center gap-2 p-2 bg-slate-100 rounded-lg text-slate-500">
      <i className="ri-file-line text-lg" />
      <span className="text-xs break-all">{file.name ?? "Attachment"}</span>
    </div>
  );
};

const Chat = () => {
  const navigate = useNavigate();
  const chatContainer = useRef<HTMLDivElement | null>(null);
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const { session, liveActiveSession, setLiveActiveSession } = useContext(Context);
  const { id } = useParams();
  const { state } = useLocation();
  const routedUser = state?.user as ActiveUserType | undefined;
  const chatId = id || "";
  const { data: chatHistory } = useSWR(
    chatId ? `/chat/${chatId}` : null,
    chatId ? Fetcher : null,
    { revalidateOnFocus: false, shouldRetryOnError: false }
  );
  const { data: conversationsData, mutate: mutateConversations } = useSWR(
    "/chat/conversations",
    Fetcher,
    { revalidateOnFocus: false, shouldRetryOnError: false }
  );

  const [messageText, setMessageText] = useState("");
  const [isMobileChatOpen, setIsMobileChatOpen] = useState(true);
  const [activeUser, setActiveUser] = useState<ActiveUserType>({
    name: "",
    initials: "",
    status: "Offline",
    image: "",
  });
  const [chats, setChats] = useState<MessageReceived[]>([]);
  const [pendingAttachment, setPendingAttachment] = useState<PendingAttachment | null>(null);
  const [sendingAttachment, setSendingAttachment] = useState(false);
  const [unreadCounts, setUnreadCounts] = useState<UnreadMap>({});
  const [shouldAutoScroll, setShouldAutoScroll] = useState(true);
  const chatsLoadedRef = useRef(false);
  const prevChatIdRef = useRef<string>("");
  const unreadClearedRef = useRef<string>("");

  const currentUserId = getUserId(session);

  // ============================================================
  // Load chat history when chatId changes
  // ============================================================
  useEffect(() => {
    if (chatId) {
      prevChatIdRef.current = chatId;
      // Defer state updates to avoid synchronous setState inside effect
      if (chatHistory && Array.isArray(chatHistory)) {
        setTimeout(() => {
          setChats(chatHistory);
          chatsLoadedRef.current = true;
        });
      } else {
        setTimeout(() => {
          setChats([]);
          chatsLoadedRef.current = false;
        });
      }
      // Clear unread for this chat
      if (chatId !== unreadClearedRef.current) {
        unreadClearedRef.current = chatId;
        setUnreadCounts((prev) => ({ ...prev, [chatId]: 0 }));
      }
    } else {
      setChats([]);
      chatsLoadedRef.current = false;
    }
  }, [chatId, chatHistory]);

  // ============================================================
  // Derive active user from chat history or routed user
  // ============================================================
  const activeUserValue = useMemo(() => {
    if (chatId && Array.isArray(chatHistory) && chatHistory.length > 0) {
      const other = chatHistory.find(
        (m: MessageReceived) => getUserId(m.from) !== currentUserId && m.from?.fullname
      );
      const user = other?.from ?? liveActiveSession ?? routedUser;
      const name = getName(user);
      if (name) {
        return {
          ...user,
          name,
          initials: getInitials(name),
          status: liveActiveSession?.status ?? routedUser?.status ?? (liveActiveSession ? "Online" : "Offline"),
          image: user?.image || "",
        };
      }
    }
    const fallbackUser = liveActiveSession ?? routedUser;
    if (fallbackUser?.fullname || fallbackUser?.name) {
      const name = getName(fallbackUser);
      return {
        ...fallbackUser,
        name,
        initials: getInitials(name),
        status: fallbackUser.status ?? (liveActiveSession ? "Online" : "Offline"),
        image: fallbackUser.image || "",
      };
    }
    return { name: "", initials: "", status: "Offline", image: "" };
  }, [chatHistory, currentUserId, liveActiveSession, routedUser, chatId]);

  useEffect(() => {
    setActiveUser(activeUserValue);
  }, [activeUserValue]);

  // ============================================================
  // Set routed user as active session if not already set
  // ============================================================
  useEffect(() => {
    if (routedUser && !liveActiveSession) {
      setLiveActiveSession(routedUser);
    }
  }, [routedUser, liveActiveSession, setLiveActiveSession]);

  // ============================================================
  // Handle scroll for auto-scroll
  // ============================================================
  const handleScroll = useCallback(() => {
    const el = chatContainer.current;
    if (!el) return;
    const isNearBottom = el.scrollHeight - el.scrollTop - el.clientHeight < 100;
    setShouldAutoScroll(isNearBottom);
  }, []);

  useEffect(() => {
    if (shouldAutoScroll && chatContainer.current) {
      requestAnimationFrame(() => {
        if (chatContainer.current) {
          chatContainer.current.scrollTop = chatContainer.current.scrollHeight;
        }
      });
    }
  }, [chats, pendingAttachment, shouldAutoScroll]);

  // ============================================================
  // Socket listeners for real-time messages
  // ============================================================
  useEffect(() => {
    const messageHandler = (msg: MessageReceived) => {
      if (getUserId(msg.from) === currentUserId) return;
      const fromId = getUserId(msg.from);
      if (fromId === chatId || msg.to === chatId) {
        setChats((prev) => [...prev, msg]);
      }
      if (fromId !== chatId) {
        setUnreadCounts((prev) => ({ ...prev, [fromId]: (prev[fromId] ?? 0) + 1 }));
      }
      setTimeout(() => mutateConversations(), 100);
    };

    const attachmentHandler = (msg: MessageReceived) => {
      if (getUserId(msg.from) === currentUserId) return;
      const fromId = getUserId(msg.from);
      if (fromId === chatId || msg.to === chatId) {
        setChats((prev) => [...prev, msg]);
      }
      if (fromId !== chatId) {
        setUnreadCounts((prev) => ({ ...prev, [fromId]: (prev[fromId] ?? 0) + 1 }));
      }
      setTimeout(() => mutateConversations(), 100);
    };

    socket.on("message", messageHandler);
    socket.on("attachment", attachmentHandler);

    return () => {
      socket.off("message", messageHandler);
      socket.off("attachment", attachmentHandler);
    };
  }, [currentUserId, chatId, mutateConversations]);

  // ============================================================
  // Build conversations list from backend
  // ============================================================
  const conversations = useMemo(() => {
    const map = new Map<string, {
      id: string; name: string; image: string | null; lastMessage: string; time: string;
    }>();
    if (conversationsData && Array.isArray(conversationsData)) {
      (conversationsData as Conversation[]).forEach((conv: any) => {
        const otherId = String(conv.otherUser?._id ?? conv.otherUserId ?? "");
        if (otherId) {
          map.set(otherId, {
            id: otherId, name: conv.otherUser?.fullname ?? "Unknown",
            image: conv.otherUser?.image ?? null,
            lastMessage: conv.hasFile ? (conv.fileName ?? "\u{1F4CE} Attachment") : conv.lastMessage,
            time: conv.lastMessageTime,
          });
        }
      });
    }
    return Array.from(map.values()).sort(
      (a, b) => new Date(b.time).getTime() - new Date(a.time).getTime()
    );
  }, [conversationsData]);

  const isOwnMessage = (msg: MessageReceived) => getUserId(msg.from) === currentUserId;

  // ============================================================
  // Send text message
  // ============================================================
  const sendMessage = () => {
    const text = messageText.trim();
    if (!text || !chatId || !session) return;

    const payload: MessageReceived = {
      from: session as any,
      to: chatId,
      message: text,
      time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
      createdAt: new Date().toISOString(),
    };

    setChats((prev) => [...prev, payload]);
    setMessageText("");
    setShouldAutoScroll(true);
    socket.emit("message", payload);
    setTimeout(() => mutateConversations(), 100);
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    sendMessage();
  };

  // ============================================================
  // Attachment handling
  // ============================================================
  const fileSharing = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file || !chatId || !session) return;
    if (file.size > 10 * 1024 * 1024) {
      CatchError(new Error("File too large. Maximum size is 10MB."));
      return;
    }
    if (pendingAttachment) URL.revokeObjectURL(pendingAttachment.previewUrl);
    const ext = file.name.split(".").pop() || "bin";
    const filename = `${uuid()}.${ext}`;
    setPendingAttachment({
      file,
      filename,
      path: `chats/${filename}`,
      previewUrl: URL.createObjectURL(file),
      type: file.type || "application/octet-stream",
    });
  };

  const clearPendingAttachment = () => {
    if (pendingAttachment) URL.revokeObjectURL(pendingAttachment.previewUrl);
    setPendingAttachment(null);
  };

  const sendAttachment = async () => {
    if (!pendingAttachment || !chatId || !session || sendingAttachment) return;
    setSendingAttachment(true);
    try {
      // Get presigned upload URL from backend
      const uploadPayload = { path: pendingAttachment.path, type: pendingAttachment.type, status: "private" };
      const { data: uploadData } = await HttpInterceptor.post("/storage/upload", uploadPayload);
      
      // Upload file directly to S3
      await axios.put(uploadData.url, pendingAttachment.file, {
        headers: { "Content-Type": pendingAttachment.type },
      });

      // Emit attachment via socket with the S3 key (NOT the presigned URL)
      socket.emit("attachment", {
        from: session,
        to: chatId,
        message: pendingAttachment.file.name,
        file: {
          path: pendingAttachment.path,
          key: pendingAttachment.path,
          name: pendingAttachment.file.name,
          type: pendingAttachment.type,
        },
      });

      // Add local message with preview URL (for immediate display)
      const localMessage: MessageReceived = {
        from: session as any,
        to: chatId,
        message: pendingAttachment.file.name,
        time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
        createdAt: new Date().toISOString(),
        file: {
          path: pendingAttachment.previewUrl,
          key: pendingAttachment.path,
          name: pendingAttachment.file.name,
          type: pendingAttachment.type,
        },
      };
      setChats((prev) => [...prev, localMessage]);
      setShouldAutoScroll(true);
      setPendingAttachment(null);
      setTimeout(() => mutateConversations(), 100);
    } catch (err) {
      CatchError(err);
    } finally {
      setSendingAttachment(false);
    }
  };

  // ============================================================
  // Download attachment
  // ============================================================
  const downloadFile = async (msg: MessageReceived) => {
    try {
      // Prefer the presigned URL (path) over the S3 key (key)
      const fileUrl = msg.file?.path || msg.file?.key;
      if (!fileUrl) return;
      
      // Already a full presigned URL → open directly
      if (/^https?:\/\//.test(fileUrl)) {
        const a = document.createElement("a");
        a.href = fileUrl;
        a.download = msg.file?.name ?? msg.message;
        a.target = "_blank";
        a.rel = "noopener noreferrer";
        document.body.appendChild(a);
        a.click();
        setTimeout(() => { document.body.removeChild(a); a.remove(); }, 100);
        return;
      }
      
      // blob: URL (local sender preview during upload) → can't be re-downloaded
      if (fileUrl.startsWith("blob:")) {
        CatchError(new Error("This preview is only available on your device."));
        return;
      }
      
      // Raw S3 key → get presigned URL from backend
      const { data } = await HttpInterceptor.post("/storage/download", { path: fileUrl });
      const a = document.createElement("a");
      a.href = data.url;
      a.download = msg.file?.name ?? msg.message;
      a.target = "_blank";
      a.rel = "noopener noreferrer";
      document.body.appendChild(a);
      a.click();
      setTimeout(() => { document.body.removeChild(a); a.remove(); }, 100);
    } catch (err) {
      CatchError(err);
    }
  };

  // ============================================================
  // Navigate to conversation
  // ============================================================
  const navigateToConversation = (convId: string, convName: string, convImage: string | null) => {
    if (convId === chatId) return;
    setUnreadCounts((prev) => ({ ...prev, [convId]: 0 }));
    setChats([]);
    navigate(`/app/chat/${convId}`, {
      state: {
        user: { id: convId, _id: convId, fullname: convName, image: convImage, status: "Offline" },
      },
    });
  };

  // Cleanup
  useEffect(() => {
    return () => {
      if (pendingAttachment) URL.revokeObjectURL(pendingAttachment.previewUrl);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="flex h-full w-full bg-white overflow-hidden" style={{ minHeight: 0 }}>
      {/* ===== LEFT SIDEBAR: Conversations (full height, independently scrollable) ===== */}
      <div
        className={`h-full w-full md:w-72 lg:w-80 flex flex-col bg-white shrink-0 border-r border-gray-200 ${
          isMobileChatOpen ? "hidden md:flex" : "flex"
        }`}
        style={{ minHeight: 0 }}>
        {/* Sticky search header */}
        <div className="shrink-0 bg-white border-b border-gray-200">
          <div className="p-4">
            <div className="relative">
              <input
                type="text"
                placeholder="Search conversations..."
                readOnly
                className="w-full pl-9 pr-4 py-2.5 bg-slate-100 rounded-xl text-sm focus:outline-none cursor-default"
              />
              <i className="ri-search-line absolute left-3 top-3 text-slate-400 text-sm"></i>
            </div>
          </div>
        </div>
        {/* Scrollable conversation list */}
        <div className="flex-1 min-h-0 overflow-y-auto divide-y divide-gray-50">
          {conversations.length === 0 && (
            <div className="flex flex-col items-center justify-center py-16 text-slate-400">
              <i className="ri-chat-3-line text-4xl mb-3"></i>
              <p className="text-sm font-medium">No conversations yet</p>
              <p className="text-xs mt-1">Start chatting with friends!</p>
            </div>
          )}
          {conversations.map((conv) => {
            const isActive = conv.id === chatId;
            const unread = unreadCounts[conv.id] ?? 0;
            return (
              <div
                key={conv.id}
                onClick={() => navigateToConversation(conv.id, conv.name, conv.image)}
                className={`p-3.5 flex items-center justify-between cursor-pointer transition-all ${
                  isActive
                    ? "bg-indigo-50/60 border-l-4 border-indigo-600 pl-2.5"
                    : "hover:bg-gray-50 pl-3.5"
                }`}>
                <div className="flex items-center gap-3 min-w-0 flex-1">
                  <div className="relative shrink-0">
                    <div className="w-10 h-10 rounded-full bg-linear-to-tr from-indigo-500 to-purple-600 flex items-center justify-center text-white font-bold text-sm shadow-sm overflow-hidden">
                      {conv.image ? (
                        <img className="w-full h-full object-cover rounded-full" src={conv.image} alt="" />
                      ) : (
                        getInitials(conv.name)
                      )}
                    </div>
                    <span className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-green-500 border-2 border-white rounded-full"></span>
                  </div>
                  <div className="min-w-0 flex-1">
                    <h4 className="text-sm font-semibold text-slate-700 truncate capitalize">{conv.name}</h4>
                    <p className="text-xs text-slate-400 truncate mt-0.5">{conv.lastMessage}</p>
                  </div>
                </div>
                <div className="flex flex-col items-end gap-1.5 shrink-0 ml-2">
                  {conv.time && (
                    <span className="text-[10px] font-medium text-slate-400 whitespace-nowrap">
                      {moment(conv.time).format("hh:mm A")}
                    </span>
                  )}
                  {unread > 0 && (
                    <span className="inline-flex items-center justify-center min-w-[18px] h-[18px] px-1 rounded-full bg-indigo-600 text-white text-[10px] font-bold leading-none">
                      {unread > 99 ? "99+" : unread}
                    </span>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* ===== RIGHT PANEL: Chat Messages ===== */}
      <div
        className={`flex-1 min-w-0 flex flex-col bg-white ${
          isMobileChatOpen ? "flex" : "hidden md:flex"
        }`}
        style={{ minHeight: 0, height: '100%' }}>
        {/* STICKY HEADER - always visible, never scrolls */}
        <div className="shrink-0 p-4 border-b border-gray-200 flex items-center justify-between bg-white z-10">
          <div className="flex items-center gap-3 min-w-0">
            <button
              onClick={() => setIsMobileChatOpen(false)}
              className="block md:hidden bg-gray-100 w-9 h-9 rounded-full hover:bg-slate-200 cursor-pointer text-slate-600 shrink-0">
              <i className="ri-arrow-left-line text-lg flex items-center justify-center h-full"></i>
            </button>
            <div className="w-10 h-10 rounded-full bg-linear-to-tr from-indigo-500 to-purple-600 flex items-center justify-center text-white font-bold text-sm shadow-inner shrink-0 overflow-hidden">
              {activeUser.image ? (
                <img src={activeUser.image} className="w-full h-full object-cover" alt="" />
              ) : (
                activeUser.initials
              )}
            </div>
            <div className="min-w-0">
              <h3 className="text-sm font-bold text-slate-800 truncate capitalize">
                {activeUser.name || "Select a conversation"}
              </h3>
              <p className="text-[11px] font-medium text-green-500 flex items-center gap-1">
                <span className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse"></span>
                {activeUser.status}
              </p>
            </div>
          </div>
          {chatId && (
            <div className="flex items-center gap-1 shrink-0">
              <Link to={`/app/audio/${chatId}`} className="p-2 text-slate-400 hover:text-indigo-600 rounded-lg hover:bg-slate-50 transition-colors">
                <i className="ri-phone-line text-lg"></i>
              </Link>
              <Link to={`/app/video/${chatId}`} className="p-2 text-slate-400 hover:text-emerald-600 rounded-lg hover:bg-slate-50 transition-colors">
                <i className="ri-video-on-line text-lg"></i>
              </Link>
            </div>
          )}
        </div>

        {/* SCROLLABLE MESSAGES - only this scrolls */}
        <div
          ref={chatContainer}
          onScroll={handleScroll}
          className="flex-1 min-h-0 overflow-y-auto p-4 space-y-4 bg-slate-50/30">
          {!chatId && (
            <div className="flex items-center justify-center h-full text-slate-400">
              <div className="text-center">
                <i className="ri-chat-3-line text-5xl mb-3 block"></i>
                <p className="text-sm font-medium">Select a conversation to start chatting</p>
              </div>
            </div>
          )}
          {chatId && chats.length === 0 && (
            <div className="flex items-center justify-center h-full text-slate-400">
              <p className="text-sm">No messages yet. Say hello!</p>
            </div>
          )}
          {chats.map((msg, idx) => {
            const isMe = isOwnMessage(msg);
            return (
              <div key={msg._id ?? idx} className={`flex flex-col w-full ${isMe ? "items-end" : "items-start"}`}>
                <span className="text-[11px] font-semibold text-slate-400 mb-1 px-1 capitalize">
                  {isMe ? "You" : msg.from?.fullname}
                </span>
                <div
                  className={`max-w-[85%] md:max-w-[80%] lg:max-w-[70%] rounded-2xl px-4 py-2.5 text-sm shadow-sm ${
                    isMe
                      ? "bg-indigo-600 text-white rounded-tr-none"
                      : "bg-white text-slate-700 border border-gray-100 rounded-tl-none"
                  }`}>
                  {msg.file && <AttachmentUi file={msg.file} />}
                  {!msg.file && <p className="leading-relaxed break-words whitespace-pre-wrap">{msg.message}</p>}
                  {msg.file && (
                    <button
                      onClick={() => downloadFile(msg)}
                      className={`mt-3 w-full inline-flex items-center justify-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition ${
                        isMe
                          ? "bg-white/20 hover:bg-white/30 text-white"
                          : "bg-indigo-50 hover:bg-indigo-100 text-indigo-700"
                      }`}>
                      <i className="ri-download-line"></i> Download
                    </button>
                  )}
                  <div className={`text-[10px] mt-1 text-right ${isMe ? "text-indigo-200" : "text-slate-400"}`}>
                    {msg.createdAt ? moment(msg.createdAt).format("hh:mm A") : msg.time}
                  </div>
                </div>
              </div>
            );
          })}
          {pendingAttachment && (
            <div className="flex justify-end">
              <div className="max-w-[85%] md:max-w-[70%] rounded-2xl rounded-tr-none bg-white border border-indigo-100 shadow-sm p-3 space-y-3">
                <div className="text-xs font-semibold text-slate-500">Ready to send</div>
                <AttachmentUi file={{ path: pendingAttachment.previewUrl, type: pendingAttachment.type, name: pendingAttachment.file.name }} />
                <div className="text-xs text-slate-500 break-all">{pendingAttachment.file.name}</div>
                <div className="flex gap-2 justify-end">
                  <button
                    type="button"
                    onClick={clearPendingAttachment}
                    disabled={sendingAttachment}
                    className="px-4 py-2 rounded-xl text-xs font-bold text-slate-500 hover:bg-slate-50 transition border border-slate-100">
                    Cancel
                  </button>
                  <button
                    type="button"
                    onClick={sendAttachment}
                    disabled={sendingAttachment}
                    className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold bg-indigo-600 text-white hover:bg-indigo-700 transition disabled:bg-slate-200 disabled:text-slate-400">
                    {sendingAttachment ? (
                      <i className="ri-loader-4-line animate-spin"></i>
                    ) : (
                      <i className="ri-send-plane-2-fill"></i>
                    )}
                    Send
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* STICKY INPUT BAR - always visible, never scrolls */}
        {chatId && (
          <div className="shrink-0 bg-white border-t border-gray-200">
            <form onSubmit={handleFormSubmit} className="p-3 flex items-center gap-3">
              <div className="flex-1 relative flex items-center min-w-0 bg-slate-50 rounded-xl border border-slate-100 focus-within:border-indigo-500/50 focus-within:bg-white transition-all">
                <input
                  ref={fileInputRef}
                  onChange={fileSharing}
                  type="file"
                  id="file-upload"
                  className="hidden"
                />
                <label
                  htmlFor="file-upload"
                  className="pl-3 pr-2 text-slate-400 hover:text-indigo-600 transition-colors cursor-pointer py-2 flex items-center justify-center">
                  <i className="ri-attachment-2 text-xl rotate-180"></i>
                </label>
                <input
                  type="text"
                  value={messageText}
                  onChange={(e) => setMessageText(e.target.value)}
                  placeholder={`Write a message to ${activeUser.name}...`}
                  className="w-full pl-1 pr-3 py-3 bg-transparent text-sm focus:outline-none text-slate-700"
                />
              </div>
              <button
                type="submit"
                className="bg-indigo-600 text-white h-11 w-11 rounded-xl flex items-center justify-center hover:bg-indigo-700 transition-all shadow-md shadow-indigo-100 active:scale-95 cursor-pointer shrink-0">
                <i className="ri-send-plane-2-fill text-lg ml-0.5"></i>
              </button>
            </form>
          </div>
        )}
      </div>
    </div>
  );
};

export default Chat;