import {BCRYPT_PEPPER,SALT_ROUND} from "../config"
import {hashSync,compareSync} from "bcrypt"

const hashingPassword=(password:string):string=>{
    const passwordPlusPebber=password.concat(BCRYPT_PEPPER as string)
return hashSync( passwordPlusPebber ,  parseInt(SALT_ROUND as string) as number)
}
const isValidPassword=(password:string, hashedPassword:string):boolean =>{
    const passwordPlusPebber=password.concat(BCRYPT_PEPPER as string)
    return compareSync(passwordPlusPebber,hashedPassword)
}
export{hashingPassword,isValidPassword}