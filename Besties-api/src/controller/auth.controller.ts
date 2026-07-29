import {Request, Response} from 'express'
import AuthModel from '../model/auth.model'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import {v4 as uuid} from 'uuid'
import { CatchError, TryError} from '../utils/error'
import { PayloadInterface, SessionInterface } from '../middleware/auth.middleware'

import moment from 'moment'




type refreshTokenType = 'at' | 'rt'


const accessTokenExpiry = '10m'

const tenMinInMilliseconds = (60 * 15) * 1000

const sevenDaysInMillisecond = (7 * 24 * 60 * 60) * 1000





const generateToken = (payload: PayloadInterface) => {
     const accessToken = jwt.sign(payload, process.env.AUTH_SECRET!, { expiresIn: accessTokenExpiry })

     const refreshToken = uuid()
     
     return {
          accessToken, refreshToken
     }

}

const getOptions = (tokenType : refreshTokenType) => {
     return {
             httpOnly: true,
               maxAge: tokenType === "at" ? tenMinInMilliseconds : sevenDaysInMillisecond,
               secure: false,
          domain: 'localhost',
               
     }
}

/* 
for future refrence we can do this because in refresh and login function so manyt things are repeathing and to work on DRY principle (dont repeat yourself) we can make helper funtion 
// 🔥 NEW REUSABLE HELPER FUNCTION
const sendTokens = async (res: Response, userId: mongoose.Types.ObjectId, payload: PayloadInterface) => {
     // 1. Generate the tokens
     const { accessToken, refreshToken } = generateToken(payload)

     // 2. Update the database with the new refresh token & expiry
     await AuthModel.updateOne(
          { _id: userId },
          {
               $set: {
                    refreshToken,
                    expiry: moment().add(7, 'days').toDate()
               }
          }
     )

     // 3. Set cookies on the response object
     res.cookie("accessToken", accessToken, getOptions('at'))
     res.cookie("refreshToken", refreshToken, getOptions('rt'))
}


*/


export const signup = async(req: Request, res: Response) => {
     try {
          await AuthModel.create(req.body)
          res.json("signup success")
          
     } catch (err: unknown) {
          //we have centralized this code and put it under error.ts
          //      if (err instanceof Error)
          //      {
          //           const status = (err as ErrorMessage).status || 500
          //           res.status(status).json({message:err.message})
          //      }
          // }
          

          CatchError(err, res)
     }
     
  
     
}



export const login = async(req: Request, res: Response) => {
     try {
          const { email, password } = req.body
          
       const user =  await AuthModel.findOne({ email: email })
          //also we can write this as
          // AuthModel.findOne({ email })

          if (!user)
          
           throw     TryError("User not found, please Sign up first" , 404)
          
               
          const isLogin = await bcrypt.compare(password, user.password)
          
          if (!isLogin)
        throw TryError("invalid credential, email or password is inscorrect", 401)
          

          const payload : PayloadInterface = {
               id: user._id,
               fullname: user.fullname,
               mobile: user.mobile,
               email: user.email,
               image: user.image 
          }

          // const options = {
          //      httpOnly: true,
          //      maxAge: (60 * 15) * 1000,
          //      secure: false,
          //      domain: 'localhost'
          // }
          
          const { accessToken, refreshToken } = generateToken(payload)


          //set refresh token while login to match from database in thge refreshToken middleware
          await AuthModel.updateOne({ _id: user._id }, {
               $set: {
               refreshToken: refreshToken,
               expiry: moment().add(7, 'days').toDate()
          }})
          
          res.cookie("accessToken", accessToken, getOptions('at'))
          res.cookie("refreshToken", refreshToken , getOptions('rt'))
          res.json({ message: "Login success" })
          
     } catch (err: unknown) {
          CatchError(err, res, "Login failed, please try after sometime")
     }
     

}


export const refreshToken = async(req: SessionInterface, res:Response) => {
     try {
          if (!req.session)
               throw TryError('failed to refresh token', 401)

          //  req.session.image = (req.session.image ? await downloadObject(req.session.image) : null)

          const { accessToken, refreshToken } = generateToken(req.session)
          await AuthModel.updateOne({ _id: req.session.id }, {
               $set: {
                   // refreshToken: refreshToken,   //or we can write 
                    refreshToken,
                    expiry: moment().add(7, 'days').toDate()

               }
          })
            res.cookie("accessToken", accessToken, getOptions('at'))
          res.cookie("refreshToken", refreshToken , getOptions('rt'))
          res.json({ message: "token refreshed" })
          
     } catch (err) {
          CatchError(err, res, "Failed to refresh token " )
     }
}



export const getSession = async(req: Request, res:Response) => {
     try {
          const accessToken = req.cookies.accessToken
          if (!accessToken)
               throw TryError("Invalid session", 401)
          const session = await jwt.verify(accessToken, process.env.AUTH_SECRET!)
          res.json(session)
          
     } catch (err) {
          CatchError(err, res, "Invalid session")
     }
}


export const updateProfilePicture = async(req:SessionInterface, res: Response) => {
     try {
          const path = `${process.env.S3_URL}/${req.body.path}`
          if(!path || !req.session)
               throw TryError("Failed to update", 400)
          await AuthModel.updateOne({ _id: req.session.id }, { $set: { image: path } })
        
          res.json({image:path})
     } catch (err) {
          CatchError(err,res, "failed to update profile picture")
     }
}


export const getUserProfile = async (req: SessionInterface, res: Response) => {
  try {
    const profileId = String(req.params.id);
    const currentUserId = req.session?.id ? String(req.session.id) : undefined;

    // Get user details
    const user = await AuthModel.findById(profileId).select("fullname image email createdAt");
    if (!user) throw TryError("User not found", 404);

    // Get posts count and recent posts
    const PostModel = (await import("../model/post.model")).default;
    const posts = await PostModel.find({ user: profileId })
      .populate("user", "fullname image email")
      .populate("comments.user", "fullname image email")
      .sort({ createdAt: -1 });

    // Serialize posts
    const { downloadObject } = await import("../utils/s3");
    const serializedPosts = await Promise.all(
      posts.map(async (post: any) => {
        const item = typeof post.toObject === "function" ? post.toObject() : post;
        const likeIds = (item.likes || []).map((id: unknown) => String(id));
        const dislikeIds = (item.dislikes || []).map((id: unknown) => String(id));
        return {
          ...item,
          attachmentUrl: item.attachments ? await downloadObject(item.attachments) : null,
          attachmentKey: item.attachments || null,
          likesCount: likeIds.length,
          dislikesCount: dislikeIds.length,
          commentsCount: item.comments?.length || 0,
          hasLiked: currentUserId ? likeIds.includes(currentUserId) : false,
          hasDisliked: currentUserId ? dislikeIds.includes(currentUserId) : false,
          isOwner: currentUserId ? String(item.user?._id ?? item.user) === currentUserId : false,
        };
      })
    );

    // Get followers count (people who added this user as friend, status accepted)
    const FriendModel = (await import("../model/friend.model")).default;
    const followersCount = await FriendModel.countDocuments({
      friend: profileId,
      status: "accepted",
    });

    // Get following count (people this user added as friend, status accepted)
    const followingCount = await FriendModel.countDocuments({
      user: profileId,
      status: "accepted",
    });

    // Check friendship status between current user and this profile
    let friendStatus: "none" | "pending" | "following" | "requested" = "none";
    let friendRequestId: string | null = null;
    if (currentUserId && currentUserId !== profileId) {
      // Did current user send a request to the profile?
      const sentRequest = await FriendModel.findOne({
        user: currentUserId,
        friend: profileId,
      });
      if (sentRequest) {
        friendRequestId = String(sentRequest._id);
        if (sentRequest.status === "accepted") {
          friendStatus = "following";
        } else if (sentRequest.status === "requested") {
          friendStatus = "pending"; // waiting for approval
        }
      } else {
        // Did the profile send a request to current user?
        const receivedRequest = await FriendModel.findOne({
          user: profileId,
          friend: currentUserId,
        });
        if (receivedRequest) {
          friendRequestId = String(receivedRequest._id);
          if (receivedRequest.status === "accepted") {
            friendStatus = "following";
          } else if (receivedRequest.status === "requested") {
            friendStatus = "requested"; // they sent you a request, you can accept
          }
        }
      }
    }

    res.json({
      user: {
        _id: user._id,
        fullname: user.fullname,
        image: user.image,
        email: user.email,
        createdAt: user.createdAt,
      },
      posts: serializedPosts,
      followersCount,
      followingCount,
      friendStatus,
      friendRequestId,
      isOwnProfile: currentUserId === profileId,
    });
  } catch (err) {
    CatchError(err, res, "Failed to fetch user profile");
  }
};

export const updateProfile = async(req: SessionInterface, res: Response) => {
  try {
    if (!req.session?.id) throw TryError("Unauthorized", 401);

    const { fullname, email, bio } = req.body;
    const updateFields: Record<string, unknown> = {};

    if (fullname) updateFields.fullname = fullname;
    if (email) updateFields.email = email;
    if (bio !== undefined) updateFields.bio = bio;

    if (Object.keys(updateFields).length === 0) {
      throw TryError("No fields to update", 400);
    }

    await AuthModel.updateOne({ _id: req.session.id }, { $set: updateFields });

    const updatedUser = await AuthModel.findById(req.session.id).select("fullname email bio image");
    res.json(updatedUser);
  } catch (err) {
    CatchError(err, res, "Failed to update profile");
  }
};

export const logout = async(req: Request, res:Response) => {
     try {

          const options = {
               httpOnly: true,
               maxAge: 0,
               secure: false,
               domain: 'localhost',
               
         }


          res.clearCookie('accessToken', options)
          res.clearCookie('refreshToken', options)
          res.json({message: 'Logout successfull'})
          
     } catch (err) {
          CatchError(err, res, "Logout error failed to logout")
     }
}