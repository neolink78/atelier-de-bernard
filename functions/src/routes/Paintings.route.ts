import { Router } from "express";
import * as PaintingsController from '../controllers/Paintings.controller'

const PaintingsRouter: Router = Router()

PaintingsRouter.get('/getByType', PaintingsController.getByType)
PaintingsRouter.get('/pages', PaintingsController.count)
PaintingsRouter.post('/', PaintingsController.add)
PaintingsRouter.patch('/', PaintingsController.update)
PaintingsRouter.get('/:id', PaintingsController.getById)

export default PaintingsRouter