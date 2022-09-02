import {client} from "../database"
import { PoolClient } from "pg"
import { FriendShip ,FriendShipResult,Friend} from "../types/Friend"

class FriendsModel {

    
    async friendShipValidator(connection:PoolClient,friend:FriendShip):Promise<number>{
    try{
     const result=((await connection.query(`SELECT COUNT(friend1_id,friend2_id) AS friendship_validate FROM friends WHERE friend1_id IN($1,$2) AND friend2_id IN($1,$2) ;`,[friend.friend1_id,friend.friend2_id])).rows[0])
     return result.rows[0].friendship_validate as number;
     }
   catch(err){
    throw new Error (`[-] Error : Can,t Fetch FriendShip : ${err}`)
    }
 }

 async create(friend:FriendShip):Promise<FriendShipResult>{
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
        throw new Error(`[-] Error While Creating FriendShip : ${err}`)
    }

 }


 async accept(friend:FriendShip):Promise<FriendShipResult>{
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
            Message:"Can,t Accept FriendShip Request ,  Invaild ID"
        }
    }
    
}

catch(err){
        throw new Error(`[-] Error While Accepting FriendShip : ${err}`)
    }

 }


 async refuse(friend:FriendShip):Promise<FriendShipResult>{
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
            Message:"Can,t refuse FriendShip Request , Invaild ID"
        }
    }
    
}

catch(err){
        throw new Error(`[-] Error While Refuseing FriendShip : ${err}` )
    }

 }

 async delete(friend:FriendShip):Promise<FriendShipResult>{
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
            Message:"Can,t Delete FriendShip,  Invaild ID"
        }
    }
    
}

catch(err){
        throw new Error(`[-] Error While Delete Friend : ${err}`)
    }

 }

 async getFriends(friend1_id:string):Promise<Friend[]>{
    
    try{
        const connection=await client.connect()
        const sqlLine=`SELECT friend2_id AS user_id FROM friends WHERE friendship_status=TRUE AND friend1_id=$1; `
        const result=await connection.query(sqlLine,[friend1_id])
        connection.release()
        return result.rows

    }
    catch(err){
throw new Error(`[-] Error While fetching Friends : ${err} `)
    }
}

async getRecievedRequests(friend2_id:string):Promise<Friend[]>{
    
    try{
        const connection=await client.connect()
        const sqlLine=`SELECT friend1_id AS user_id FROM friends WHERE friendship_status=FALSE AND friend2_id=$1; `
        const result=await connection.query(sqlLine,[friend2_id])
        connection.release()
        return result.rows

    }
    catch(err){
throw new Error(`[-] Error While fetching Recieved Requests : ${err} `)
    }
}
 


async getSendedRequests(friend1_id:string):Promise<Friend[]>{
    
    try{
        const connection=await client.connect()
        const sqlLine=`SELECT friend2_id AS user_id FROM friends WHERE friendship_status=FALSE AND friend1_id=$1; `
        const result=await connection.query(sqlLine,[friend1_id])
        connection.release()
        return result.rows

    }
    catch(err){
throw new Error(`[-] Error While fetching Sended Requests : ${err} `)
    }
}

 
}

export {FriendsModel}