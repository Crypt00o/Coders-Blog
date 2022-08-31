type Article = {
    article_id?:string,
    user_id:string,
    article_title:string,
    article_body:string,
    creation_date?:string,
}
type ArticleValidate ={
user_id?:string,
article_title?:string,
article_body?:string,
creation_date?:string,
valid:boolean
}
export {Article,ArticleValidate}