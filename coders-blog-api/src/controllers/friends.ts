import { Friend , FriendShip , FriendShipResult } from "../types/Friend";
import { FriendsModel } from "../models/friends";
import { Request,Response } from "express";
import validator from "../utils/validator";

const friendmodel=new FriendsModel();



const create=async(req:Request,res:Response):Promise<void>=>{
    
    try{
    
        if(validator.uuid_v4_Validator(req.params.user_id) &&validator.uuid_v4_Validator(req.params.friend_id) ){
            const friendship:FriendShip={friend1_id:req.params.user_id,friend2_id:req.params.friend_id}
            const friendShipResult:FriendShipResult=await friendmodel.create(friendship)
            if(friendShipResult.Error){
                res.status(400).json(friendShipResult)
            }
            else{
                res.status(200).json(friendShipResult)
            }
        }
    
        else{
            res.status(400).json({"Error": "This is Not Valid User ID Or Friend ID"})
        }

    }
    
    catch(err){
        res.status(400).json({"Error": "This is Not Valid User ID Or Friend ID"})
    }
}


const accept=async(req:Request,res:Response):Promise<void>=>{
    try{
        if(validator.uuid_v4_Validator(req.params.user_id) &&validator.uuid_v4_Validator(req.params.friend_id) ){
            const friendship:FriendShip={friend1_id:req.params.user_id,friend2_id:req.params.friend_id}
            const friendShipResult:FriendShipResult=await friendmodel.accept(friendship)
            if(friendShipResult.Error){
                res.status(400).json(friendShipResult)
            }
            else{
                res.status(200).json(friendShipResult)
            }
        }
        else{
            res.status(400).json({"Error": "This is Not Valid User ID Or Friend ID"})
        }

    }
    catch(err){
        res.status(400).json({"Error": "This is Not Valid User ID Or Friend ID"})
    }
}


const refuse=async(req:Request,res:Response):Promise<void>=>{
    try{
        if(validator.uuid_v4_Validator(req.params.user_id) &&validator.uuid_v4_Validator(req.params.friend_id) ){
            const friendship:FriendShip={friend1_id:req.params.user_id,friend2_id:req.params.friend_id}
            const friendShipResult:FriendShipResult=await friendmodel.refuse(friendship)
            if(friendShipResult.Error){
                res.status(400).json(friendShipResult)
            }
            else{
                res.status(200).json(friendShipResult)
            }
        }
        else{
            res.status(400).json({"Error": "This is Not Valid User ID Or Friend ID"})
        }

    }
    catch(err){
        res.status(400).json({"Error": "This is Not Valid User ID Or Friend ID"})
    }
}


const _delete=async(req:Request,res:Response):Promise<void>=>{
    try{
        if(validator.uuid_v4_Validator(req.params.user_id) &&validator.uuid_v4_Validator(req.params.friend_id) ){
            const friendship:FriendShip={friend1_id:req.params.user_id,friend2_id:req.params.friend_id}
            const friendShipResult:FriendShipResult=await friendmodel.delete(friendship)
            if(friendShipResult.Error){
                res.status(400).json(friendShipResult)
            }
            else{
                res.status(200).json(friendShipResult)
            }
        }
        else{
            res.status(400).json({"Error": "This is Not Valid User ID Or Friend ID"})
        }

    }
    catch(err){
        res.status(400).json({"Error": "This is Not Valid User ID Or Friend ID"})
    }
}


const getFriends=async(req:Request,res:Response):Promise<void>=>{
    try{
        if(validator.uuid_v4_Validator(req.params.user_id)){
            const friends:Array<Friend>=await friendmodel.getFriends(req.params.user_id as string)
            if(friends.length==0){
                res.status(200).json({user_id:req.params.user_id,total_friends:friends.length,friends:friends,message:"this user haven,t friends untill now"})
            }
            else{
                res.status(200).json({user_id:req.params.user_id,total_friends:friends.length,friends:friends})
            }
        }
        else{
            res.status(400).json({"Error": "This is Not Valid User ID"})
        }
    }
    catch(err){
        res.status(400).json({"Error": "User ID Not Found"})
    }
}


const getRecievedRequests=async(req:Request,res:Response):Promise<void>=>{
    try{
        if(validator.uuid_v4_Validator(req.params.user_id)){
            const friends:Array<Friend>=await friendmodel.getRecievedRequests(req.params.user_id as string)
            if(friends.length==0){
                res.status(200).json({user_id:req.params.user_id,total_recieved_request:friends.length,friendship_requests:friends,message:"you haven,t friendship_requests untill now"})
            }
            else{
                res.status(200).json({user_id:req.params.user_id,total_recieved_request:friends.length,friendship_requests:friends})
            }
        }
        else{
            res.status(400).json({"Error": "This is Not Valid User ID"})
        }
    }
    catch(err){
        res.status(400).json({"Error": "User ID Not Found"})
    }
}


const getSendedRequests= async(req:Request,res:Response):Promise<void>=>{
    try{
        if(validator.uuid_v4_Validator(req.params.user_id)){
            const friends:Array<Friend>=await friendmodel.getSendedRequests(req.params.user_id as string)
            if(friends.length==0){
                res.status(200).json({user_id:req.params.user_id,total_sended_request:friends.length,friendship_requests:friends,message:"you haven,t send friendship_requests untill now"})
            }
            else{
                res.status(200).json({user_id:req.params.user_id,total_sended_request:friends.length,friendship_requests:friends})
            }
        }
        else{
            res.status(400).json({"Error": "This is Not Valid User ID"})
        }
    }
    catch(err){
        res.status(400).json({"Error": "User ID Not Found"})
    }
}

export {create,accept,refuse,_delete,getFriends,getRecievedRequests,getSendedRequests}