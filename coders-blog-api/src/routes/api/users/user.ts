import { Router } from "express";
import { authenticateing,authenticateingByTokenId } from "../../../middlewares/auth.middleware";
import userController from "../../../controllers/users"
const usersRouter = Router()
usersRouter.route("/").get(authenticateing, userController.index).post(userController.create)
usersRouter.route("/:user_id").get(authenticateingByTokenId , userController.show).patch(authenticateingByTokenId , userController.update).delete(authenticateingByTokenId , userController._delete)
usersRouter.route("/login").post(userController.login)
usersRouter.get("/:user_id/info",authenticateing,userController.generalInfo)
export {usersRouter}