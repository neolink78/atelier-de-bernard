import { sendMail } from '../nodemailer'
import * as ContactsRepository from '../repositories/Contacts.repository'
import { Contact } from '../schemas/Contacts.schema'

export const post = async (contact: Contact) => {
    const exists = await ContactsRepository.getOne(contact.mail)
    if (exists) throw new Error('You already sent an email with this address')
    const create = await ContactsRepository.post(contact)
    await sendMail(contact)
    return create
}