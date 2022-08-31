import {ArticlesModel} from "../models/articles"
import {Article} from "../types/Article"
import  validator  from "../utils/validator";
import { Request,Response } from "express";


const articleModel= new ArticlesModel()

const index=async(req:Request,res:Response):Promise<void>=>{
    try{
        const articles:Array<Article>=await articleModel.index()
        if(articles.length===0){
            res.status(200).json({"Coders Blog - Articles":"We Don,t Have Articles Untill Now :("})
        }
        else{
        res.status(200).json({"Coders Blog - Articles":articles})
        } 
    }
    catch(err){
        res.status(500).json({"Error": "Error While Getting Articles"})
    }
}

const show=async(req:Request,res:Response):Promise<void>=>{
    try{
        if(validator.uuid_v4_Validator(req.params.user_id) && validator.uuid_v4_Validator(req.params.article_id )){
            const article:Article=await articleModel.show(req.params.article_id as string,req.params.user_id as string)
            if(article.article_id){
                res.status(200).json({"Coders Blog - Article":article}) 
            }
            else{
                res.status(400).json({"Error": "This Article Not Found "})
            }
        }
        else{
            res.status(400).json({"Error": "This is Not Valid User ID OR Article ID"})
        }
    }
    catch(err){
        res.status(400).json({"Error": "This Article Not Found "})
        
    }
}
const create=async(req:Request,res:Response):Promise<void>=>{
    try{
        const newArticle:Article={user_id:req.params.user_id as string, article_title:req.body.title as string , article_body:req.body.article as string,creation_date:(new Date().toISOString().slice(0, 10)) }
        
        const articleValidate=validator.articleValidator(newArticle)
        if(articleValidate.valid){
            const createdArticle=await articleModel.create(newArticle)
            res.status(200).json({"Success":createdArticle})
        }
        else{
            res.status(400).json({"Error":articleValidate})  
        }
    }
    catch(err){
        res.status(400).json({"Error":"Can,t Create Article , May UserId is Not Valid :("})
    }
}

const update=async(req:Request,res:Response):Promise<void>=>{
    try{
        if(validator.uuid_v4_Validator(req.params.article_id)){
            const updateArticle:Article={user_id:req.params.user_id as string,article_id:req.params.article_id, article_title:req.body.title as string , article_body:req.body.article as string, lastupdate_date:(new Date().toISOString().slice(0, 10)) }
            const articleValidate=validator.articleValidator(updateArticle)
            if(articleValidate.valid){
                const updatedArticle=await articleModel.update(updateArticle)
                res.status(200).json({"Success":updatedArticle})
            }
            else{
                res.status(400).json({"Error":articleValidate})  
            }
        }
        else{

            res.status(400).json({"Error": "This is Not Valid User ID"})
        }
    }
    catch(err){
        res.status(400).json({"Error":"Can,t Create Article , May UserID Or OrderID is Not Valid :("})
    }
}
const _delete=async(req:Request,res:Response):Promise<void>=>{
    try{
        if(validator.uuid_v4_Validator(req.params.user_id) && validator.uuid_v4_Validator(req.params.article_id )){
            const article:Article=await articleModel.delete(req.params.article_id as string,req.params.user_id as string)
            if(article.article_id){
                res.status(200).json({"Article Deleted":article.article_id}) 
            }
            else{
                res.status(400).json({"Error": "This Article ID Not Found To Delete"})
            }
        }
        else{
            res.status(400).json({"Error": "This is Not Valid User ID OR Article ID"})
        }
    }
    catch(err){
        res.status(400).json({"Error": "This Article ID Not Found To Delete"})
        console.log(err)
    }
}

const showArticlesByUserId=async(req:Request,res:Response):Promise<void>=>{
    try{
        
        if(validator.uuid_v4_Validator(req.params.user_id as string)){
        const articles:Array<Article>=await articleModel.showArticlesByUserId(req.params.user_id)
        if(articles.length===0){
            res.status(200).json({"Coders Blog - Articles":"This User Doesn,t Have Articles Untill Now :("})
        }
        else{
        res.status(200).json({id:req.params.user_id,"Coders Blog - Articles":articles})
        } 
    }
    else{
        res.status(400).json({"Error": "This is Not Valid User ID"})
    }
    }
    catch(err){
        res.status(500).json({"Error": "Error While Getting This User Articles"})
    }
}


export default {index,show,create,update,_delete,showArticlesByUserId}