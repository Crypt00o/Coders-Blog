import { Router } from "express";
import { authenticateing,authenticateingByTokenId } from "../../../middlewares/auth.middleware";
import articlesController from "../../../controllers/articles"

const articlesRouter = Router()
articlesRouter.route("/").get( articlesController.index)
articlesRouter.route("/:user_id").get( articlesController.showArticlesByUserId).post(authenticateingByTokenId,articlesController.create)
articlesRouter.route("/:user_id/:article_id").get(articlesController.show).patch(authenticateingByTokenId , articlesController.update).delete(authenticateingByTokenId , articlesController._delete)
export {articlesRouter}