import { Request,Response,NextFunction} from "express";
import { checkToken,checkToken_id } from "../utils/tokenizator";

const notAuthenticated = (req: Request, res: Response): void => {
    res.status(401).json({ Authentication: 'Failed' })
  }
  const authenticateingByTokenId = (req: Request, res: Response, next: NextFunction): void => {
    try {
      const authenticateHeader = req.header('Authorization')
      if (authenticateHeader) {
        const authenticateToken = authenticateHeader.split(' ')[1]
        const bearerRegexp = /Bearer/
        const bearerHeader = authenticateHeader.split(' ')[0]
        if (authenticateToken && bearerRegexp.test(bearerHeader)) {
          if (checkToken_id(authenticateToken,req.params.id as string)||checkToken_id(authenticateToken,req.body.id as string) ) {
            next()
          } else {
            notAuthenticated(req, res)
          }
        } else {
          notAuthenticated(req, res)
        }
      } else {
        notAuthenticated(req, res)
      }
    } catch (err) {
      notAuthenticated(req, res)
    }
  }

  const authenticateing = (req: Request, res: Response, next: NextFunction): void => {
    try {
      const authenticateHeader = req.header('Authorization')
      if (authenticateHeader) {
        const authenticateToken = authenticateHeader.split(' ')[1]
        const bearerRegexp = /Bearer/
        const bearerHeader = authenticateHeader.split(' ')[0]
        if (authenticateToken && bearerRegexp.test(bearerHeader)) {
          if (checkToken(authenticateToken )||checkToken(authenticateToken) ) {
            next()
          } else {
            notAuthenticated(req, res)
          }
        } else {
          notAuthenticated(req, res)
        }
      } else {
        notAuthenticated(req, res)
      }
    } catch (err) {
      notAuthenticated(req, res)
    }
  }

  export { authenticateing ,authenticateingByTokenId}