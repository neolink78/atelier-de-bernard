import { Router } from 'express'
import * as ContactsController from '../controllers/Contacts.controller'

const ContactsRouter: Router = Router()

ContactsRouter.post('/', ContactsController.post)

export default ContactsRouter