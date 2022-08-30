import { Router } from "express";
import {index,show,create,update,_delete} from "../../../controllers/users"

const usesrRouter = Router()
usesrRouter.route("/").get(index).post(create)
usesrRouter.route("/:id").get(show).patch(update).delete(_delete)

export {usesrRouter}