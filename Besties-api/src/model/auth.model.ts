import { Schema, model, Document } from 'mongoose'
import bcrypt from 'bcrypt'

// import {v4 as uuid} from 'uuid'
// import moment from 'moment'

export interface AuthInterface extends Document {
     image?: string | null;
     fullname: string;
     email: string;
     mobile: string;
     password: string;
     refreshToken?: string | null;
     expiry?: Date | null;
     bio?: string | null;
     createdAt: Date;
     updatedAt: Date;
}




const authSchema = new Schema <AuthInterface>({
     image: {
          type: String,
          default:null
     },
     fullname: {
          type: String,
          lowercase: true,
          trim: true,
          required:true
     },
     email: {
          type: String,
          required: true,
          trim: true,
          unique: true
     },
     mobile: {
          type: String,
          required: true,
          trim: true,
          unique: true
     },
     password: {
          type: String,
          required:true
     },
     refreshToken: {
          type:String
     },
     expiry: {
          type:Date
     },
     bio: {
          type: String,
          default: null
     }
}, { timestamps: true })

authSchema.pre <AuthInterface> ('save', async function () {
      if (!this.isModified("password")) return;
     try {
          this.password  = await bcrypt.hash(this.password.toString(), 12)
          return 
     } catch (err) {
          throw err
     }

})

//when your application is modern and directly go to main page after signup then use this medthod 

/* authSchema.pre("save", function (next) {
     this.refreshToken = uuid()
     this.expiry = moment().add(7, 'days').toDate()
     next()
     
}) */

//but in our case we are sending user to login page first ,so we do not send referesh token during signup thats why 
authSchema.pre<AuthInterface> ("save", function ( ) {
     this.refreshToken = null
     this.expiry = null
     
     
})




const AuthModel = model('Auth', authSchema)
 export default AuthModel