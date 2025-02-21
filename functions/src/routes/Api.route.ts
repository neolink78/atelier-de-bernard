import { Router } from 'express'
import * as ApiController from '../controllers/Api.controller'

const ApiRouter: Router = Router()

ApiRouter.post('/', ApiController.post)

export default ApiRouter