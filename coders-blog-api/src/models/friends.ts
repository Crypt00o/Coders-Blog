import {client} from "../database"
import { PoolClient } from "pg"
import { Friend ,FriendShipResult} from "../types/Friend"

class FriendsModel {

    
    async friendShipValidator(connection:PoolClient,friend:Friend):Promise<number>{
    try{
     const result=((await connection.query(`SELECT COUNT(friend1_id,friend2_id) AS friendship_validate FROM friends WHERE friend1_id IN($1,$2) AND friend2_id IN($1,$2) ;`,[friend.friend1_id,friend.friend2_id])).rows[0])
     return result.rows[0].friendship_validate as number;
     }
   catch(err){
    throw new Error ('[-] Error : Can,t Fetch FriendShip ')
    }
 }

 async create(friend:Friend):Promise<FriendShipResult>{
    try{
    const connection= await client.connect();
    const validateResult=await this.friendShipValidator(connection,friend)

    if(validateResult==0){
        const sqlLine=`INSERT INTO friends(friend1_id,friend2_id) VALUES($1,$2) RETURNING friend1_id,friend2_id; `
        const result=await connection.query(sqlLine,[friend.friend1_id,friend.friend2_id])
        return {
            Error:false,
            Message:"Request Sended Successfully",
            friend:result.rows[0].friend2_id as string
        }
    }
    
    else if(validateResult==1){
       
        return {
            Error:true ,
            Message:"Can,t Send FriendShip Request, Already Sended"
        }
    
    }
    
    else if (validateResult==2){
        return {
            Error:true ,
            Message:"Can,t Send FriendShip Request, Already Friends"
        }
    }
    
    else{
        return {
            Error:true ,
            Message:"Can,t Send FriendShip Request, Invaild ID "
        }
    }
    
}

catch(err){
        throw new Error("[-] Error While Creating FriendShip ")
    }

 }


 async accept(friend:Friend):Promise<FriendShipResult>{
    try{
    const connection= await client.connect();
    const validateResult=await this.friendShipValidator(connection,friend)

    if(validateResult==0){
        connection.release()
        return {
            Error:true,
            Message:"Can,t Accept FriendShip Request, There is no Request"
        }
    }
    
    else if(validateResult==1){
        const sqlLine=`INSERT INTO friends(friend1_id,friend2_id) VALUES($1,$2) RETURNING friend1_id,friend2_id; `
        const result=await connection.query(sqlLine,[friend.friend1_id,friend.friend2_id])
        await connection.query(`UPDATE friends SET friendship_status=TRUE,friendship_date=now() WHERE friend1_id IN ($1,$2) AND friend2_id IN ($1,$2);`,[friend.friend1_id,friend.friend2_id])
        connection.release()
        return {
            Error:false,
            Message:"Request Accepted Successfully",
            friend:result.rows[0].friend2_id as string
        }
    
    }
    
    else if (validateResult==2){
        connection.release()
        return {
            Error:true ,
            Message:"Can,t Accept FriendShip Request, Already Friends"
        }
    }
    
    else{
        connection.release()
        return {
            Error:true ,
            Message:"Can,t Accept FriendShip Request, Already Friends"
        }
    }
    
}

catch(err){
        throw new Error("[-] Error While Accepting FriendShip ")
    }

 }


 async refuse(friend:Friend):Promise<FriendShipResult>{
    try{
    const connection= await client.connect();
    const validateResult=await this.friendShipValidator(connection,friend)

    if(validateResult==0){
        connection.release()
        return {
            Error:true,
            Message:"Can,t Refuse FriendShip Request, There is no Request"
        }
    }
    
    else if(validateResult==1){
        const sqlLine=`DELETE FROM friends where friend1_id in ($1,$2) and friend2_id in ($1,$2) RETURNING friend1_id,friend2_id; `
        const result=await connection.query(sqlLine,[friend.friend1_id,friend.friend2_id])
        connection.release()
        return {
            Error:false,
            Message:"Request Refused Successfully",
            friend:result.rows[0].friend2_id as string
        }
    
    }
    
    else if (validateResult==2){
        connection.release()
        return {
            Error:true ,
            Message:"Can,t Refuse FriendShip Request, Already Friends"
        }
    }
    
    else{
        connection.release()
        return {
            Error:true ,
            Message:"Can,t Send FriendShip Request, Already Friends"
        }
    }
    
}

catch(err){
        throw new Error("[-] Error While Refuseing FriendShip ")
    }

 }

 async delete(friend:Friend):Promise<FriendShipResult>{
    try{
    const connection= await client.connect();
    const validateResult=await this.friendShipValidator(connection,friend)

    if(validateResult==0){
        connection.release()
        return {
            Error:true,
            Message:"Can,t Delete FriendShip, There is no Friend Ship"
        }
    }
    
    else if(validateResult==1){
            connection.release()
            return {
                Error:true ,
                Message:"Can,t Delete FriendShip, There is no Friend Ship"
            }
        }
    
    
    
    else if (validateResult==2){
        const sqlLine=`DELETE FROM friends where friend1_id in ($1,$2) and friend2_id in ($1,$2) RETURNING friend1_id,friend2_id; `
        const result=await connection.query(sqlLine,[friend.friend1_id,friend.friend2_id])
        connection.release()
        return {
            Error:false,
            Message:"FriendShip Deleted Successfully",
            friend:result.rows[0].friend2_id as string
        }
        
    }
    
    else{
        connection.release()
        return {
            Error:true ,
            Message:"Can,t Send FriendShip Request, Already Friends"
        }
    }
    
}

catch(err){
        throw new Error("[-] Error While Refuseing FriendShip ")
    }

 }




 
}