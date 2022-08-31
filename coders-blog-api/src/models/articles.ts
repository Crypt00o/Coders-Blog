import {client} from "../database"
import {Article} from "../types/Article"

class ArticlesModel{
    async index():Promise<Array<Article>>{
        try{
          const connection=await client.connect()
          const sqlLine=`SELECT * FROM articles;`
          const result=await connection.query(sqlLine)
          connection.release()
          return result.rows
        }
        catch(err){
            throw new Error(`[-] Error While index Articles : ${err}`)
        }
    }

    async show(article_id:string,user_id:string):Promise<Article>{
        try{
        const connection=await client.connect()
        const sqlLine=`SELECT * FROM articles WHERE article_id=$1 AND user_id=$2;`
        const result=await connection.query(sqlLine,[article_id,user_id])
        connection.release()
        return result.rows[0]
        }
        catch(err){
            throw new Error(`[-] Error While show Article : ${err}`)
        }
    }

    async showArticlesByUserId(user_id:string):Promise<Article[]>{
        try{
        const connection=await client.connect()
        const sqlLine=`SELECT * FROM articles WHERE user_id=$1;`
        const result=await connection.query(sqlLine,[user_id])
        connection.release()
        return result.rows
        }
        catch(err){
            throw new Error(`[-] Error While show User Articles : ${err}`)
        }
    }
 
    async create(article:Article):Promise<Article>{
        try{
        const connection= await client.connect()
        article.creation_date=new Date().toISOString().slice(0, 10);
        const sqlLine=`INSERT INTO articles(user_id,article_title,article_body,createtion_date) VALUES($1,$2,$3,$4) RETURNING * ;`
        const result= await connection.query(sqlLine,[article.user_id,article.article_title,article.article_body,article.creation_date])
        connection.release()
        return result.rows[0]
        }
        catch(err){
            throw new Error(`[-] Error While Create Article : ${err}`)
        }
    }
    
    async update(article:Article):Promise<Article>{
        try{
         const connection=await client.connect()
         article.creation_date=new Date().toISOString().slice(0, 10);
         const sqlLine=`UPDATE articles SET article_title=($3),article_body=($4),createtion_date=($5) WHERE article_id=$1 AND user_id=$2 RETURNING * ;`
         const result=await connection.query(sqlLine,[article.article_id,article.user_id, article.article_title,article.article_body,article.creation_date])
         connection.release()
         return result.rows[0]
        }
        catch(err){
            throw new Error(`[-] Error While Update Article : ${err}`)
        }

    }

    async delete(article_id:string,user_id:string):Promise<Article>{
        try{
            const connection=await client.connect()
            const sqlLine=`DELETE FROM articles WHERE article_id=$1 AND user_id=$2;`
            const result=await connection.query(sqlLine,[article_id,user_id])
            connection.release()
            return result.rows[0]
        }
        catch(err){
            throw new Error(`[-] Error While Delete Article : ${err}`)
        }
    }


}

export {ArticlesModel}