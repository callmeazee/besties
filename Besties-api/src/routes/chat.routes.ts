import { Router } from "express";
import AuthMiddleware from "../middleware/auth.middleware";
import { fetchChats, fetchConversations } from "../controller/chat.controller";

const ChatRouter = Router()

ChatRouter.get("/conversations", AuthMiddleware, fetchConversations)
ChatRouter.get("/:to", AuthMiddleware, fetchChats)

export default ChatRouter
