import express, { Router } from 'express'
import { welcomeMessage, notFound } from '../controllers/main.controller'
import {join} from 'path'
import { usersRouter } from './api/users/user'
import { articlesRouter } from './api/articles/articles'
//Declareing Static Directory for Serving Static Files 

const staticDir:string=join(__dirname,'..','..','static')

//Creatring Router instance

const router: Router = express.Router()

// Useing Static Directory for Serving Static Files 

router.use('/static',express.static(staticDir))

// Welcome Message With / EndPoint

router.get('/', welcomeMessage)

// Useing User Router With /users/ Endpoint
router.use('/users', usersRouter)

// Response With Not Found for any invalid path
router.use("/articles",articlesRouter)

router.all('/*', notFound)

export default router

