import prisma from "../db";
import { v4 as uuidv4 } from 'uuid'
import { Contact } from '../schemas/Contacts.schema'

export const getOne = async (email: string) => {
    const result = await prisma.contacts.findUnique({
        where: { mail: email }
    })
    return result
}

export const post = async (contact: Contact) => {
    const result = await prisma.contacts.create({
        data: {
            id: uuidv4(),
            firstname: contact.firstname,
            lastname: contact.lastname,
            mail: contact.mail
        }
    })
    return result
}