import { Router } from "express";
import PaintingsRouter from "./Paintings.route";
import ContactsRouter from "./Contacts.route"
import ApiRouter from "./Api.route";

const router: Router = Router()

router.use('/paintings', PaintingsRouter)
router.use('/contacts', ContactsRouter)
router.use('/api', ApiRouter)

export default router