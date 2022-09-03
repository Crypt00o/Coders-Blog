type User ={
    user_id?:string,
    user_name:string,
    email?:string,
    password?:string,
    first_name:string,
    last_name:string,
    join_date?:string
}
type UserValidate= {
    user_name?:string,
    email?:string,
    password?:string,
    first_name?:string,
    last_name?:string,
    valid:boolean
}

export {User,UserValidate}