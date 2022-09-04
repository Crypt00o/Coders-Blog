import { sign,verify} from "jsonwebtoken"
import { JWT_SECRET} from "../config"
import {hashingUserIdAccess, isValidUserIdAccess} from "./hashing"
const generateToken=(user_id:string):string=>{
    return sign({access:hashingUserIdAccess(user_id)},JWT_SECRET as string)
}
const checkToken_id=(token:string,user_id:string):boolean=>{
    const tokenDecoded :{access:string} =verify(token,JWT_SECRET as string) as {access:string}
    
    if(isValidUserIdAccess(user_id,tokenDecoded.access)){
        return true;
    }
    else{
        return false;
    }

}
const checkToken=(token:string):string=>{

return verify(token,JWT_SECRET as string) as string 
}
export {checkToken,checkToken_id,generateToken}