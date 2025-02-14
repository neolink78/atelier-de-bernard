import nodemailer from 'nodemailer'
import { Contact } from './schemas/Contacts.schema'

const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 465,
    secure: true,
    auth: {
        user: process.env.NODEMAILER_USER,
        pass: process.env.NODEMAILER_PWD,
    }
})

export const sendMail = async (contact: Contact) => {
    const mailOptions = {
        from: contact.mail,
        to: process.env.NODEMAILER_USER,
        subject: `L'atelier de Bernard - ${contact.firstname} ${contact.lastname} (${contact.mail}) vous a contacté !`,
        text: contact.message
    }

    try {
        const info = await transporter.sendMail(mailOptions)
        return info
    } catch (err) {
        console.log(err)
    }
 }