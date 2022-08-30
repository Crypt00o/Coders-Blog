import express, { Router } from 'express'
import { welcomeMessage, notFound } from '../controllers/main.controller'
import {join} from 'path'
import { usesrRouter } from './api/users/user'
//Declareing Static Directory for Serving Static Files 

const staticDir:string=join(__dirname,'..','..','static')

//Creatring Router instance

const router: Router = express.Router()

// Useing Static Directory for Serving Static Files 

router.use('/static',express.static(staticDir))

// Welcome Message With / EndPoint

router.get('/', welcomeMessage)

// Useing User Router With /users/ Endpoint
router.use('/users', usesrRouter)

// Response With Not Found for any invalid path

router.all('/*', notFound)

export default router

