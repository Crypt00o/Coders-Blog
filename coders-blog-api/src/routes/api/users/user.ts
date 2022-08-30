import { Router } from "express";
import {index,show,create,update,_delete,login} from "../../../controllers/users"

const usesrRouter = Router()
usesrRouter.route("/").get(index).post(create)
usesrRouter.route("/:id").get(show).patch(update).delete(_delete)
usesrRouter.route("/login").post(login)
export {usesrRouter}