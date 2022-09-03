import {Router} from "express"
import {create,accept,refuse,_delete,getFriends,getRecievedRequests,getSendedRequests} from "../../../controllers/friends"
import { authenticateing,authenticateingByTokenId } from "../../../middlewares/auth.middleware";
const friendsRouter=Router()
friendsRouter.get("/:user_id/:friend_id/add_friend",authenticateingByTokenId,create)
friendsRouter.get("/:user_id/:friend_id/accept_request",authenticateingByTokenId,accept)
friendsRouter.get("/:user_id/:friend_id/delete_request",authenticateingByTokenId,refuse)
friendsRouter.get("/:user_id/:friend_id/delete_friend",authenticateingByTokenId,_delete)
friendsRouter.get("/:user_id",authenticateing,getFriends)
friendsRouter.get("/:user_id/requests_recieved",authenticateingByTokenId,getRecievedRequests)
friendsRouter.get("/:user_id/requests_sended",authenticateingByTokenId,getSendedRequests)
export {friendsRouter}