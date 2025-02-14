import { Router } from "express";
import PaintingsRouter from "./Paintings.route";
import ContactsRouter from "./Contacts.route"

const router: Router = Router()

router.use('/paintings', PaintingsRouter)
router.use('/contacts', ContactsRouter)

export default router