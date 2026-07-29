import AuthApiDoc from "../swagger/auth.swagger";
import FriendApiDoc from "../swagger/friend.swagger";
import StorageApiDoc from "../swagger/storage.swagger";


const SwaggerConfig = {
     openapi: "3.0.0",
     info: {
          title: "Besties official api",
          description: "Alll the private and public listed here",
          version: "1.0.0",
          contact: {
               name: 'Azeez ahemed khan',
               email: 'developerzee@gmail.com'
          }
     },
     servers: [
          {url: process.env.SERVER}
     ],
     paths: {
          ...AuthApiDoc,
          ...StorageApiDoc,
          ...FriendApiDoc
     }
}
export default SwaggerConfig