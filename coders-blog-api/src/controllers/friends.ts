import { Friend , FriendShip , FriendShipResult } from "../types/Friend";
import { FriendsModel } from "../models/friends";
import { Request,Response } from "express";
import validator from "../utils/validator";

const friendmodel=new FriendsModel();



const create=async(req:Request,res:Response):Promise<void>=>{
    try{

    }
    catch(err){

    }
}


const accept=async(req:Request,res:Response):Promise<void>=>{
    try{

    }
    catch(err){

    }
}


const refuse=async(req:Request,res:Response):Promise<void>=>{
    try{

    }
    catch(err){

    }
}


const _delete=async(req:Request,res:Response):Promise<void>=>{
    try{

    }
    catch(err){

    }
}


const getFriends=async(req:Request,res:Response):Promise<void>=>{
    try{

    }
    catch(err){

    }
}


const getRecievedRequests=async(req:Request,res:Response):Promise<void>=>{
    try{

    }
    catch(err){

    }
}


const getSendedRequests= async(req:Request,res:Response):Promise<void>=>{
    try{

    }
    catch(err){

    }
}

export {create,accept,refuse,_delete,getFriends,getRecievedRequests,getSendedRequests}