import {client} from "../database"
import {User} from "../types/User"
import {hashingPassword,isValidPassword} from "../utils/hashing"
import {PoolClient} from "pg"

class UsersModel{
   async index(totalUsersFetch:number,indexOffset:number):Promise<Array<User>>{
    try{
     const connection=await client.connect()
     const sqlLine=`SELECT user_id,first_name,last_name FROM users ORDER BY join_date ASC LIMIT $1 OFFSET $2;`
     const result = await connection.query(sqlLine,[totalUsersFetch,indexOffset])
     connection.release()
     return result.rows
    }
    catch(err){
        throw new Error(`[-] Error While index Users : ${err}`)
    }
   }
   
async show(user_id:string):Promise<User>{

try{
    const connection=await client.connect()
    const sqlLine=`SELECT user_id,user_name,email,first_name,last_name,join_date FROM users WHERE user_id=$1;`
    const result = await connection.query(sqlLine,[user_id])
    connection.release()
    return result.rows[0]
}
catch(err){
throw new Error(`[-] Error While show User : ${err}`)
}
}

async create(user:User):Promise<User>{
    try{
      const connection=await client.connect()
      const sqlLine= ` INSERT INTO users(user_name,email,password,first_name,last_name) VALUES($1,$2,$3,$4,$5) RETURNING user_id,user_name,email,first_name,last_name,join_date;`
      const result=await connection.query(sqlLine,[user.user_name,user.email,hashingPassword(user.password as string),user.first_name,user.last_name])
      connection.release()
      return result.rows[0]
    }
    catch(err){
        throw new Error(`[-] Error While Create User : ${err}`)
    }
}


async update(user:User):Promise<User>{
    try{
      const connection=await client.connect()
      const sqlLine= `UPDATE users SET user_name=($2),email=($3),password=($4),first_name=($5),last_name=($6) WHERE user_id=$1 RETURNING user_id,user_name,email,first_name,last_name;`
      const result=await connection.query(sqlLine,[user.user_id,user.user_name,user.email, hashingPassword(user.password as string),user.first_name,user.last_name])
      connection.release()
      return result.rows[0]
    }
    catch(err){
        throw new Error(`[-] Error While Update User : ${err}`)
    }
}

async delete(user_id:string):Promise<User>{
    try{
        const connection=await client.connect()
        
        const sqlLine=`DELETE FROM users WHERE user_id=$1 RETURNING user_id , user_name , email , first_name , last_name;`
        await connection.query(`DELETE FROM articles WHERE user_id=$1 ;`,[user_id])
        await connection.query(`DELETE FROM friends WHERE friend1_id=$1 OR friend2_id=$1 ;`,[user_id])
        const result = await connection.query(sqlLine,[user_id])

        connection.release()
        return result.rows[0]
    }
    catch(err){
    throw new Error(`[-] Error While Delete User : ${err}`)
    }   
}

async userValidator(connection :PoolClient,user_id:string):Promise<boolean>{

    const checkUserAvailability=(await connection.query(`SELECT COUNT(user_id) AS user_validate FROM users WHERE user_id=$1;`,[user_id])).rows[0]

if(checkUserAvailability.user_validate as number==0){
    return false;
}
else{
    return true;
}
}

async generalInfo(user_id:string):Promise<User>{

    try{
        const connection=await client.connect()
        const sqlLine=`SELECT user_i,first_name,last_name FROM users WHERE user_id=$1;`
        const result = await connection.query(sqlLine,[user_id])
        connection.release()
        return result.rows[0]
    }
    catch(err){
    throw new Error(`[-] Error While Getting User Info : ${err}`)
    }
    }

    
async login(user_name:string,password:string):Promise<string | false>{
    try{
        const connection=await client.connect()
        const sqlLine=`SELECT password FROM users WHERE user_name=$1;`
        const result = await connection.query(sqlLine,[user_name])
        connection.release()

        if(isValidPassword(password,result.rows[0].password as string)){
            const connection=await client.connect()
            const sqlLine=`SELECT user_id FROM users WHERE user_name=$1;`
            const result = await connection.query(sqlLine,[user_name])
            connection.release()
            return result.rows[0].user_id
        } 
        else{
            return false;
        }
    }
    catch(err){
        throw new Error(`[-] Error While Login For This User : ${err}`)
        }   

}

}
export {UsersModel}