import {User} from "../types/User"
import { UserValidate } from "../types/UserValidate"
const uuid_v4_Validator= (uuid_v4?:string):boolean=>{
 const uuid_v4_Regex=/^[0-9A-F]{8}-[0-9A-F]{4}-[4][0-9A-F]{3}-[89AB][0-9A-F]{3}-[0-9A-F]{12}$/i
    return uuid_v4_Regex.test(uuid_v4 as string)
}


const userValidator=(user:User):UserValidate =>{
    const emailRegex=/^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/
    const passwordRegex=/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/
    const usernameRegex= /^[a-zA-Z0-9]+$/;
    let userValidate:UserValidate={valid:true}
    
if(user.email && user.user_name && user.first_name && user.last_name && user.password  ){
    if(!emailRegex.test(user.email)){
        userValidate.email="Not Vaild E-mail"
        userValidate.valid=false
    }
    if(!usernameRegex.test(user.user_name)){
        userValidate.user_name="Not Vaild user_name"
        userValidate.valid=false
    }
    if(!passwordRegex.test(user.password)){
        userValidate.password="Not Vaild Password , should contain 8 characters at least and one lowercase letter at least and one uppercase letter at least and one number at least"
        userValidate.valid=false
    }
    if(!usernameRegex.test(user.first_name)){
        userValidate.first_name="Not Vaild name"
        userValidate.valid=false
    }
    if(!usernameRegex.test(user.last_name)){
        userValidate.last_name="Not Vaild name"
        userValidate.valid=false
    }

return userValidate


}

else{
userValidate.valid=false
return userValidate
}
}



export default {uuid_v4_Validator,userValidator }
