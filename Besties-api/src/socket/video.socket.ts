import { Server } from "socket.io"
import * as cookie from "cookie";
import jwt, { JwtPayload } from "jsonwebtoken";

const VideoSocket = (io: Server) => {
     io.on("connection", (socket) => {
        try {
          const rawCookie = socket.handshake.headers.cookie || "";
          const cookies = cookie.parse(rawCookie);
          const accessToken = cookies.accessToken;

          if (accessToken) {
            const user = jwt.verify(accessToken, process.env.AUTH_SECRET!) as JwtPayload;
            if (user.id) {
              socket.join(user.id);
              console.log(`Video socket: User ${user.id} joined room`);
            }
          }
        } catch (err) {
          console.log("Video socket auth error:", err instanceof Error ? err.message : err);
        }

        // Keep explicit join as a fallback
        socket.on("join", (userId) => {
          if (userId) {
            socket.join(userId);
            console.log(`Video socket: Manual join for ${userId}`);
          }
        });

        socket.on("offer", ({ offer, to, from, type }) => {
          if (!to) return;
          from.socketId = socket.id;
          io.to(to).emit("offer", { offer, from, type });
        });

        socket.on("candidate", ({ candidate, to }) => {
          if (!to) return;
          io.to(to).emit("candidate", { candidate, from: socket.id });
        });

        socket.on("answer", ({ answer, to }) => {
          if (!to) return;
          io.to(to).emit("answer", { answer, from: socket.id });
        });

        socket.on("end", ({ to }) => {
          if (to) io.to(to).emit("end", { from: socket.id });
        });

        socket.on("disconnect", () => {
          console.log(`Video socket disconnected: ${socket.id}`);
        });
     });
}

export default VideoSocket