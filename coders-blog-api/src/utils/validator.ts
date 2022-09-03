import {User,UserValidate} from "../types/User"
import {Article,ArticleValidate } from "../types/Article"
const uuid_v4_Validator= (uuid_v4?:string):boolean=>{
 const uuid_v4_Regex=/^[0-9A-F]{8}-[0-9A-F]{4}-[4][0-9A-F]{3}-[89AB][0-9A-F]{3}-[0-9A-F]{12}$/i
    return uuid_v4_Regex.test(uuid_v4 as string)
}


const userValidator=(user:User):UserValidate =>{
    const emailRegex=/^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/
    const passwordRegex=/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/
    const usernameRegex= /^[a-zA-Z0-9]+$/;
    let userValidate:UserValidate={valid:true}
    

    if(!user.email || !emailRegex.test(user.email)){
        userValidate.email="Not Vaild E-mail"
        userValidate.valid=false
    }
    if(!user.user_name || !usernameRegex.test(user.user_name)){
        userValidate.user_name="Not Vaild username"
        userValidate.valid=false
    }
    if(!user.password ||!passwordRegex.test(user.password)){
        userValidate.password="Not Vaild Password , should contain 8 characters at least and one lowercase letter at least and one uppercase letter at least and one number at least"
        userValidate.valid=false
    }
    if(!user.first_name ||!usernameRegex.test(user.first_name)){
        userValidate.first_name="Not Vaild name"
        userValidate.valid=false
    }
    if(!user.last_name ||!usernameRegex.test(user.last_name)){
        userValidate.last_name="Not Vaild name"
        userValidate.valid=false
    }

return userValidate


}

const userLoginValidator=(username:string,password:string):UserValidate=>{
    const userValidate:UserValidate={valid:true}
    const passwordRegex=/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/
    const usernameRegex= /^[a-zA-Z0-9]+$/;
    if(!username || !usernameRegex.test(username)){
        userValidate.user_name="Not Vaild username"
        userValidate.valid=false
    }
    if(!password ||!passwordRegex.test(password)){
        userValidate.password="Not Vaild Password , should contain 8 characters at least and one lowercase letter at least and one uppercase letter at least and one number at least"
        userValidate.valid=false
    }
return userValidate
}

const articleValidator=(article:Article):ArticleValidate=>{
    const articleValidate:ArticleValidate={valid:true}
if(!article.article_title||  article.article_title.length < 5 || article.article_title.length > 255 ){
articleValidate.article_title="Not Valid Title , Please Enter An Article Title Between 5 and 255 Letters Length",
articleValidate.valid=false
}

if(!article.article_body|| article.article_body.length < 1 || article.article_body.length > 5000){
    articleValidate.article_body="Not Valid Body , Please Enter An Article Body Between 1 and 5000 Letters Length"
    articleValidate.valid=false
}

if(!article.user_id || !uuid_v4_Validator(article.user_id)){
 article.user_id="Not Valid User Id"
 articleValidate.valid=false
}
return articleValidate

}

const offsetValidator=(offset:number):number=>{
    if (typeof offset == 'number' && offset < 10000000000000000){
        return offset;
    }
    else{
        return 0;
    }
}

export default {uuid_v4_Validator,userValidator,userLoginValidator,articleValidator,offsetValidator }
