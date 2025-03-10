import { sendMail } from '../nodemailer'
import * as ContactsRepository from '../repositories/Contacts.repository'
import { Contact } from '../schemas/Contacts.schema'

export const post = async (contact: Contact) => {
    const exists = await ContactsRepository.getOne(contact.mail)
    if (exists) throw new Error('Vous avez déjà envoyé un mail avec cette adresse')
    const create = await ContactsRepository.post(contact)
    await sendMail(contact)
    return create
}