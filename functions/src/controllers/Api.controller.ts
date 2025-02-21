import {Request, Response} from "express"
import * as ApiService from '../services/Api.service'

export const post = async(req: Request, res: Response) => {
    try {
        const { items } = req.body
        const {origin} = req.headers
        if(!origin) return
        const buy = await ApiService.post(items, origin)
        res.status(200).send(buy)
    } catch (err) {
        res.status(500).send(err)
    }
}