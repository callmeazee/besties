import { Request, Response } from "express"
import FriendModel from "../model/friend.model"
import { SessionInterface } from "../middleware/auth.middleware"
import { CatchError, TryError } from "../utils/error"
import AuthModel from "../model/auth.model"
import mongoose from "mongoose"


export const addFriend = async(req: SessionInterface, res: Response) => {
     try {

          req.body.user = req.session?.id
          const friend = await FriendModel.create(req.body)
          res.json({message: 'Friend request sent'})
          
     } catch (err) {
          CatchError(err, res, "Failed to send fruiend request")
          
     }
}


// export const fetchFriend = async(req: SessionInterface, res: Response) => {
//      try {
//        const user = req.session?.id
//           const friends = await FriendModel.find({ $or: [{ user: user }, { friend: user }],
//   status: "accepted" }).populate('friend').populate('user')
//           res.json(friends)
          
//      } catch (err) {
//          CatchError(err, res, "Failed to fetch friends")
          
//      }
// }

export const fetchFriend = async (req: SessionInterface, res: Response) => {
  try {
    const userId = req.session?.id

    const friends = await FriendModel.find({
      $or: [{ user: userId }, { friend: userId }],
      status: "accepted"
    })
      .populate('user', 'fullname image email')
      .populate('friend', 'fullname image email')

    // Deduplicate: ensure we only return each friend once
    const seenIds = new Set<string>()
    const currentUserIdStr = String(userId)
    const mapped = friends
      .map((doc: any) => {
        // Safely get the other person's data
        const userObj = typeof doc.user === "object" ? doc.user : null
        const friendObj = typeof doc.friend === "object" ? doc.friend : null

        const userObjId = userObj?._id ? String(userObj._id) : ""
        const friendObjId = friendObj?._id ? String(friendObj._id) : ""

        // Determine the "other person"
        let otherPerson = userObjId === currentUserIdStr ? friendObj : userObj
        const otherId = otherPerson?._id ? String(otherPerson._id) : ""

        // Skip if no valid friend or if it's actually the current user
        if (!otherPerson || !otherId || otherId === currentUserIdStr) return null

        // Deduplicate: skip if already included
        if (seenIds.has(otherId)) return null
        seenIds.add(otherId)

        return {
          _id: doc._id,
          status: doc.status,
          friend: otherPerson
        }
      })
      .filter(Boolean)

    res.json(mapped)

  } catch (err) {
    CatchError(err, res, "Failed to fetch friends")
  }
}

export const deleteFriend = async(req: Request, res: Response) => {
     try {
          const { id } = req.params
          await FriendModel.deleteOne({ _id : id })
          // or
          //   await FriendModel.deleteOne({ req.params.id })
          res.json({message: "Friend deleted successfully"})

          
     } catch (err) {
         CatchError(err, res, "Failed to fetch friends")
          
     }
}

export const friendRequest = async(req: SessionInterface, res: Response) => {
     try {

          if (!req.session)
               throw TryError('Failed to fetch friend request')
          
          //when we want to implement projection in populate function so we can use this  populate("user", "fullname image")  it display only fullname and image from user suppose i want everything except passoword and email so i will write like this populate("user", "-password -email")
          const friends = await FriendModel.find({ friend: req.session.id, status: "requested" }).populate("user", "fullname image")
          
          res.json(friends)
       

          
     } catch (err) {
         CatchError(err, res, "Failed to fetch friends")
          
     }
}

export const updateFriendStatus = async(req: SessionInterface, res: Response) => {
     try {
          if (!req.session)
               throw TryError('Failed to update friend request')

          await FriendModel.updateOne(
          {
             _id : req.params.id
          },
          {
             $set: {status: req.body.status}
          }
     )
        res.json({message: "Friend status updated"})

          
     } catch (err) {
          CatchError(err, res, "Failed to update friends")
          
     }
}

// export const suggestedFriends = async(req: SessionInterface, res: Response) => {
//      try {
//           const friends = await AuthModel.aggregate([
//                {
//                     $match: { 
//                          _id: { $ne: new mongoose.Types.ObjectId(req.session?.id) }
//                      }
//                },
//                { $sample: { size: 5 } },
//                {$project: {fullname:1, image: 1, createdAt: 1}}
//           ])
         
//           const modified = await Promise.all(
//                friends.map(async (item) => {
//                     const count = await FriendModel.countDocuments({   $or: [
//     { user: item._id },
//     { friend: item._id }
//   ] })
//                     return count === 0 ? item : null


//              })
//         )

//        const filtered =     modified.filter((item)=> item !== null)

//           res.json(filtered)
          
//      } catch (err) {
//         CatchError(err, res, "Failed")
          
//      }
// }


export const suggestedFriends = async (req: SessionInterface, res: Response) => {
  try {
    const currentUserId = new mongoose.Types.ObjectId(req.session?.id)

    // Get IDs of users already connected to current user (either direction)
    const existingConnections = await FriendModel.find({
      $or: [
        { user: currentUserId },
        { friend: currentUserId }
      ]
    }).select('user friend')

    // Build a set of excluded IDs (self + anyone already in a friend doc)
    const excludedIds = new Set<string>()
    excludedIds.add(currentUserId.toString())

          existingConnections.forEach(conn => {
               if (conn.user) excludedIds.add(conn.user.toString())
               if (conn.friend) excludedIds.add(conn.friend.toString())
          })

          const excludedObjectIds = [...excludedIds]
               .filter(id => mongoose.Types.ObjectId.isValid(id))
               .map(id => new mongoose.Types.ObjectId(id))

    // Shuffle all unconnected registered users randomly using $sample
    // Use a large sample size to ensure we get all (or nearly all) users
    const suggestions = await AuthModel.aggregate([
      {
        $match: {
          _id: { $nin: excludedObjectIds }
        }
      },
      { $sample: { size: 200 } },
      { $project: { fullname: 1, image: 1, createdAt: 1 } }
    ])

    res.json(suggestions)

  } catch (err) {
    CatchError(err, res, "Failed to fetch suggestions")
  }
}