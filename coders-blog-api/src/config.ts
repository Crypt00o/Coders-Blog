import {config} from "dotenv"
import {env} from "process"
config()

let DATABASE: string
const {
    POSTGRES_HOST,
    POSTGRES_PORT,
    POSTGRES_DB ,
    POSTGRES_DB_TEST,
    POSTGRES_USER,
    POSTGRES_PASSWORD,
    BCRYPT_PEPPER,
    SALT_ROUND,
    JWT_SECRET,
    NODE_ENV
  } = env
  
if (NODE_ENV==="test"){
    DATABASE=POSTGRES_DB_TEST as string
}
else{
DATABASE=POSTGRES_DB as string
}


export {
    POSTGRES_HOST,
    POSTGRES_PORT,
    DATABASE,
    POSTGRES_USER,
    POSTGRES_PASSWORD,
    BCRYPT_PEPPER,
    SALT_ROUND,
    JWT_SECRET}