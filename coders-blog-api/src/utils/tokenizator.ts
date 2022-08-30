import {JwtPayload, sign,verify} from "jsonwebtoken"
import { JWT_SECRET} from "../config"
const generateToken=(user_id:string):string=>{
    return sign({user_id:user_id},JWT_SECRET as string)
}
const checkToken_id=(token:string,user_id:string):boolean=>{
    const tokenDecoded :{user_id:string} =verify(token,JWT_SECRET as string) as {user_id:string}

    if(tokenDecoded.user_id===user_id){
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