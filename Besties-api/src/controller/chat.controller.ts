import { Response } from "express";
import { SessionInterface } from "../middleware/auth.middleware";
import ChatModel from "../model/chat.model";
import { CatchError, TryError } from "../utils/error";
import { downloadObject } from "../utils/s3";

interface PayloadInterface {
  from: string;
  to: string;
  message: string;
  file?: {
    path: string;
    type: string;
  };
}

export const createChat = (payload: PayloadInterface) => {
  ChatModel.create(payload).catch((err) => {
    console.log(err.message);
  });
};

export const fetchChats = async(req: SessionInterface, res: Response) => {
     try {
          if (!req.session)
               throw TryError("failed to fetch chats")
          const chats = await ChatModel.find({
            $or: [
              { from: req.session?.id, to: req.params.to },
              { from: req.params.to, to: req.session?.id },
            ]
          }).populate('from', "fullname image email mobile").lean().sort({createdAt: 1})
        const modifiedChats =     await Promise.all(
         chats.map(async (item) => {
           if (item.file)
           {
             return {
               ...item,
               file: {
                 path: item.file.path && await downloadObject(item.file.path),
                 key: item.file.path,
                 name: item.message,
                 type: item.file.type
               }
             }
           } else {
             return item
           }
             
            })
          )
          res.json(modifiedChats)
       
     } catch (err) {
          CatchError(err, res, 'Failed to fetch chats')
     }

}

/**
 * Fetch conversation list – latest message per unique person the user has chatted with
 */
export const fetchConversations = async (req: SessionInterface, res: Response) => {
  try {
    if (!req.session) throw TryError("Unauthorized", 401);

    const userId = req.session.id;

    // Get all unique other users from chats involving this user
    const conversations = await ChatModel.aggregate([
      {
        $match: {
          $or: [{ from: userId }, { to: userId }],
        },
      },
      { $sort: { createdAt: -1 } },
      {
        $group: {
          _id: null,
          users: { $addToSet: { $cond: [{ $eq: ["$from", userId] }, "$to", "$from"] } },
          latest: { $first: "$$ROOT" },
        },
      },
      { $unwind: "$users" },
      { $replaceRoot: { newRoot: { $mergeObjects: ["$latest", { otherUserId: "$users" }] } } },
      { $sort: { createdAt: -1 } },
    ]);

    // Populate user details
    const AuthModel = (await import("../model/auth.model")).default;
    const enriched = await Promise.all(
      conversations.map(async (conv: any) => {
        const otherUser = await AuthModel.findById(conv.otherUserId)
          .select("fullname image email")
          .lean();
        return {
          _id: conv._id,
          otherUser: otherUser || { fullname: "Unknown", image: null },
          lastMessage: conv.message,
          lastMessageTime: conv.createdAt,
          hasFile: !!conv.file,
          fileName: conv.file?.name || null,
        };
      })
    );

    res.json(enriched);
  } catch (err) {
    CatchError(err, res, "Failed to fetch conversations");
  }
};