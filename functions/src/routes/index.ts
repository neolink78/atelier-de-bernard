import { Router } from "express";
import PaintingsRouter from "./Paintings.route";

const router: Router = Router()

router.use('/paintings', PaintingsRouter)

export default router