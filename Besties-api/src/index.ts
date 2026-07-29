import dotenv from "dotenv";
dotenv.config();

import mongoose from "mongoose";
mongoose.connect(process.env.DB as string);

/* second way to write 
mongoose.connect(process.env.DB!) */

import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import AuthRouter from "./routes/auth.routes";
import StorageRouter from "./routes/storage.route";
import AuthMiddleware from "./middleware/auth.middleware";
import FriendRouter from "./routes/friend.routes";
import { Server } from "socket.io";
import { createServer } from "http";
import SwaggerConfig from "./utils/swagger";
import { serve, setup } from "swagger-ui-express";
import StatusSocket from "./socket/status.socket";
import corsConfig from "./utils/corsConfig";
import ChatSocket from "./socket/chat.socket";
import ChatRouter from "./routes/chat.routes";
import VideoSocket from "./socket/video.socket";
import TwilioRouter from "./routes/twilio.routes";
import PostRouter from "./routes/post.route";

const app = express();
const server = createServer(app);

server.listen(process.env.PORT || 8080, () => {
  console.log(`Db connected server is running on ${process.env.PORT}`);
});

//socket connections
const io = new Server(server, {cors: corsConfig})
StatusSocket(io);
ChatSocket(io)
VideoSocket(io)

//middleware
app.use(cors(corsConfig));

//endpoints
app.use("/api-docs", serve, setup(SwaggerConfig));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use("/auth", AuthRouter);
app.use("/storage", AuthMiddleware, StorageRouter);
app.use("/friend", AuthMiddleware, FriendRouter);
app.use("/post",AuthMiddleware, PostRouter)
app.use("/chat", ChatRouter)
app.use("/twilio", TwilioRouter)
