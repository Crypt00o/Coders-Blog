import { Pool } from "pg";
import {POSTGRES_HOST,POSTGRES_PORT,DATABASE,POSTGRES_USER,POSTGRES_PASSWORD,BCRYPT_PEPPER,SALT_ROUND,JWT_SECRET} from "../config"
const client =new  Pool({
    host:POSTGRES_HOST,
    port:parseInt(POSTGRES_PORT as string) as number,
    user:POSTGRES_USER,
    password:POSTGRES_PASSWORD,
    database:DATABASE
})

export {client}