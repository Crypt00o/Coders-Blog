import {BCRYPT_PEPPER,SALT_ROUND} from "../config"
import {hashSync,compareSync} from "bcrypt"
import validator from "./validator"
const hashingPassword=(password:string):string=>{
    const passwordPlusPebber=password.concat(BCRYPT_PEPPER as string)
return hashSync( passwordPlusPebber ,  parseInt(SALT_ROUND as string) as number)
}
const isValidPassword=(password:string, hashedPassword:string):boolean =>{
    const passwordPlusPebber=password.concat(BCRYPT_PEPPER as string)
    return compareSync(passwordPlusPebber,hashedPassword)
}
const hashingUserIdAccess=(user_id:string):string=>{
    const idPlusPepper=user_id.concat(BCRYPT_PEPPER as string)
    return hashSync(idPlusPepper,parseInt(SALT_ROUND as string) as number)
}
const isValidUserIdAccess=(user_id:string,hashedUserIdAccess:string)=>{
    const idPlusPepper=user_id.concat(BCRYPT_PEPPER as string)
    return compareSync(idPlusPepper,hashedUserIdAccess)
}
export{hashingPassword,isValidPassword,hashingUserIdAccess,isValidUserIdAccess}