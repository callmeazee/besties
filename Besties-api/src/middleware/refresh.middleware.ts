import { NextFunction, Request, Response } from "express"
import { CatchError, TryError } from "../utils/error"
import AuthModel from "../model/auth.model"
import moment from "moment"
import { SessionInterface } from "./auth.middleware"


const RefreshTokenMiddleware = async(req: SessionInterface, res:Response, next: NextFunction) => {
      try {
            const refreshToken = req.cookies.refreshToken
            
            if (!refreshToken)
                  throw TryError("Failed to refresh token", 401)
            //also use short hand property
            const user = await AuthModel.findOne({ refreshToken: refreshToken })
            
            if (!user)
                  throw TryError("Failed to refresh token", 401)

            const today = moment()
            const expiry = moment(user.expiry)
            


            //logic is -> we check ki aaj ka din expiry se bad hai to token ko expire krdo warna mat kro and isafter function humko wahi check kr ke deta hai 
            const isExpired = today.isAfter(expiry)
            
            if (isExpired)
                  throw TryError("Failed to refresh token", 401)

            req.session  = {
               id: user.id as any,
               email: user.email,
               mobile: user.mobile,
               fullname: user.fullname,
               image: user.image || null
          }

            next()
                  

         
     } catch (err) {
           CatchError(err, res, 'Failed to refresh token')
          
      }

}
export default RefreshTokenMiddleware