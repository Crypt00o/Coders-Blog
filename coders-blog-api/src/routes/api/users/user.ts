import { Router } from "express";
import { authenticateing,authenticateingByTokenId } from "../../../middlewares/auth.middleware";
import {index,show,create,update,_delete,login} from "../../../controllers/users"

const usesrRouter = Router()
usesrRouter.route("/").get(authenticateing, index).post(create)
usesrRouter.route("/:id").get(authenticateingByTokenId , show).patch(authenticateingByTokenId , update).delete(authenticateingByTokenId , _delete)
usesrRouter.route("/login").post(login)
export {usesrRouter}