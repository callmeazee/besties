import { Server } from "socket.io";
import * as cookie from "cookie";
import jwt, { JwtPayload } from "jsonwebtoken";
import { createChat } from "../controller/chat.controller";
import { downloadObject } from "../utils/s3";

const ChatSocket = (io: Server) => {
  io.on("connection", (socket) => {
    // Auto-join user's room from cookie (same pattern as VideoSocket)
    try {
      const rawCookie = socket.handshake.headers.cookie || "";
      const cookies = cookie.parse(rawCookie);
      const accessToken = cookies.accessToken;
      if (accessToken) {
        const user = jwt.verify(accessToken, process.env.AUTH_SECRET!) as JwtPayload;
        if (user.id) {
          socket.join(user.id);
        }
      }
    } catch (err) {
      // Not authenticated for chat socket - messages may not route
    }

    socket.on("message", (payload) => {
      const message = String(payload?.message ?? "").trim();
      const fromId = payload?.from?.id || payload?.from?._id;

      if (!message || !fromId || !payload?.to) return;

      const chatPayload = {
        ...payload,
        from: fromId,
        message,
      };

      createChat(chatPayload);

      io.to(payload.to).emit("message", {
        from: payload.from,
        to: payload.to,
        message,
        createdAt: new Date().toISOString(),
      });
    });

    socket.on("attachment", async (payload) => {
      const message = String(payload?.message ?? "").trim();
      const fromId = payload?.from?.id || payload?.from?._id;

      if (!message || !fromId || !payload?.to || !payload?.file?.path) {
        return;
      }

      createChat({
        ...payload,
        from: fromId,
        message,
      });

      const downloadUrl = await downloadObject(payload.file.path).catch(() => payload.file.path);

      io.to(payload.to).emit("attachment", {
        from: payload.from,
        to: payload.to,
        message,
        createdAt: new Date().toISOString(),
        file: {
          path: downloadUrl,
          key: payload.file.path,
          name: payload.file.name ?? message,
          type: payload.file.type,
        },
      });
    });
  });
};

export default ChatSocket;

