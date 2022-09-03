import {Router} from "express"
import friendsController from "../../../controllers/friends"
import { authenticateing,authenticateingByTokenId } from "../../../middlewares/auth.middleware";
const friendsRouter=Router()
friendsRouter.get("/:user_id/:friend_id/add_friend",authenticateingByTokenId,friendsController.create)
friendsRouter.get("/:user_id/:friend_id/accept_request",authenticateingByTokenId,friendsController.accept)
friendsRouter.get("/:user_id/:friend_id/delete_request",authenticateingByTokenId,friendsController.refuse)
friendsRouter.get("/:user_id/:friend_id/delete_friend",authenticateingByTokenId,friendsController._delete)
friendsRouter.get("/:user_id",authenticateing,friendsController.getFriends)
friendsRouter.get("/:user_id/requests_recieved",authenticateingByTokenId,friendsController.getRecievedRequests)
friendsRouter.get("/:user_id/requests_sended",authenticateingByTokenId,friendsController.getSendedRequests)
export {friendsRouter}