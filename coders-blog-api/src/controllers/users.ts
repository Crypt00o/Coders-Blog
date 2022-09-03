import  { Request, Response } from "express";
import {User} from "../types/User"
import {UsersModel} from "../models/users"
import  validator  from "../utils/validator";
import {generateToken} from "../utils/tokenizator"


const userModel=new UsersModel()

const index= async(req:Request,res:Response):Promise<void>=>{
    try{
        const users:Array<User>= await userModel.index()
        if(users.length===0){
            res.status(200).json({"Coders Blog - Users":"We Don,t Have Users Untill Now :("})
        }
        else{
        res.status(200).json({"Coders Blog - Users":users})
        }
    }
    catch(err){
       res.status(500).json({"Error": "Error While Getting Users"})
    }
}
const show= async(req:Request,res:Response):Promise<void>=>{
    try{
        if(validator.uuid_v4_Validator(req.params.user_id)){
            const user:User=await userModel.show(req.params.user_id as string)
            if(user.user_id){
                res.status(200).json({"Coders Blog - User":user})     
            }
            else{
                res.status(400).json({"Error": "This User Not Found "})
            }
        }
        else {
            res.status(400).json({"Error": "This is Not Valid User ID"})
        }
    }
    catch(err){
        res.status(400).json({"Error": "This User Not Found "})
    }
}
const create= async(req:Request,res:Response):Promise<void>=>{
    try{
        const newUser:User={user_name:req.body.username as string, email:req.body.email as string ,password:req.body.password as string ,first_name:req.body.firstname as string,last_name:req.body.lastname  as string   }
        const userValidate=validator.userValidator(newUser)
        if(userValidate.valid){
            const createdUser=await userModel.create(newUser)
            res.status(200).json({"Success":createdUser})
        }
        else{
            res.status(400).json({"Error":userValidate})
        }
    }
    catch(err){
        res.status(400).json({"Error":"Can,t Create User , May Email Or Username Used Before  :("})
    }
}
const update= async(req:Request,res:Response):Promise<void>=>{
    try{
        if(validator.uuid_v4_Validator(req.params.user_id)){
            const updateUser:User={user_id:req.params.user_id as string,user_name:req.body.username as string, email:req.body.email as string ,password:req.body.password as string ,first_name:req.body.firstname as string,last_name:req.body.lastname  as string   }
            const userValidate=validator.userValidator(updateUser)
            if(userValidate.valid){
                const updatedUser=await userModel.update(updateUser)
                res.status(200).json({"Success":updatedUser})
            }
            else{
                res.status(400).json({"Error":userValidate})
            }
        }
        else{
            res.status(400).json({"Error": "This is Not Valid User ID"})
        }

    }
    catch(err){
        res.status(400).json({"Error":"Can,t Update User , May Email Or Username Used Before Or UserId Not Found :("})
       
    }
}

const _delete= async(req:Request,res:Response):Promise<void>=>{
    try{
        if(validator.uuid_v4_Validator(req.params.user_id)){
            const deletedUser:User=await userModel.delete(req.params.user_id as string)
            if(deletedUser.user_id){
                res.status(200).json({"User Deleted":deletedUser.user_id})     
            }
            else{
                res.status(400).json({"Error": "This User Not Found To Delete "})
            }
        }
        else {
            res.status(400).json({"Error": "This is Not Valid User ID"})
        }
    }
    catch(err){
        res.status(400).json({"Error": "This User Not Found To Delete "})
        
    }
}

const generalInfo= async(req:Request,res:Response):Promise<void>=>{
    try{
        if(validator.uuid_v4_Validator(req.params.user_id)){
            const user:User=await userModel.generalInfo(req.params.user_id as string)
            if(user.user_id){
                res.status(200).json({"Coders Blog - User":user})     
            }
            else{
                res.status(400).json({"Error": "This User Not Found "})
            }
        }
        else {
            res.status(400).json({"Error": "This is Not Valid User ID"})
        }
    }
    catch(err){
        res.status(400).json({"Error": "This User Not Found "})
    }
}


const login= async(req:Request,res:Response):Promise<void>=>{
    try{
        const userValidate=validator.userLoginValidator(req.body.username as string , req.body.password as string )
        if(userValidate.valid){
            const user_id=await userModel.login(req.body.username as string , req.body.password as string)
            if(user_id){
                res.status(200).json({"Login":"Success","id":user_id,"token":generateToken(user_id)})
        
            }
            else{
                res.status(401).json({"Login":"Failed"})
            }
        }
        else{
            res.status(400).json({"Error":userValidate})
        }
        
    }
    catch(err){
        res.status(401).json({"Login":" Failed , Error While Login"})
        
    }
}

export default {index,show,create,update,_delete,login,generalInfo}