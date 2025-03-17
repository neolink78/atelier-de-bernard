import { Request, Response } from "express";
import * as ContactsService from '../services/Contacts.service'

export const post = async (req: Request, res: Response) => {
    if(!req.body.mail) throw new Error("An email is needed")
    if(!req.body.message) throw new Error("A message is needed")
    try {
        const create = await ContactsService.post(req.body)
        res.status(200).send(create)
    } catch (err: any) {
        res.status(500).send({error: err.message || 'Internal Server Error'})
    }
}