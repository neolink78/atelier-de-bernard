import { Router } from "express";
import PaintingsRouter from "./Paintings.route";

const router: Router = Router()

router.use('/paintings', PaintingsRouter)

router.get('/test', (req, res) => {
    res.send('Test route working');
  });

export default router