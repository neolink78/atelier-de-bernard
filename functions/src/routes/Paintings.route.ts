import { Router } from "express";
import * as PaintingsController from '../controllers/Paintings.controller'

const PaintingsRouter: Router = Router()

PaintingsRouter.get('/', PaintingsController.getAll)
PaintingsRouter.post('/', PaintingsController.add)
PaintingsRouter.patch('/', PaintingsController.update)

export default PaintingsRouter