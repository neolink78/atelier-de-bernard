import { Router } from "express";
import * as PaintingsController from '../controllers/Paintings.controller'

const PaintingsRouter: Router = Router()

PaintingsRouter.get('/', PaintingsController.getAll)
// @ts-expect-error your fault
PaintingsRouter.post('/', PaintingsController.addPainting)

export default PaintingsRouter