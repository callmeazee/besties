import { addFriend, deleteFriend, fetchFriend, friendRequest, suggestedFriends, updateFriendStatus } from "../controller/friend.controller"



const { Router } = require('express')

const FriendRouter = Router()

FriendRouter.post("/", addFriend)
FriendRouter.put("/:id", updateFriendStatus)
FriendRouter.get("/", fetchFriend)
FriendRouter.get("/suggestion", suggestedFriends)
FriendRouter.get("/request", friendRequest)
FriendRouter.delete("/:id", deleteFriend)


export default FriendRouter