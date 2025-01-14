import { Request, Response } from "express";
import * as PaintingsService from '../services/Paintings.service'
import { UploadedFile } from "express-fileupload";

export const getAll = async (req: Request, res: Response) => {
    try {
        const paintings = await PaintingsService.getAll()
        res.status(200).send(paintings)
    } catch (err) {
        console.log(err)
        res.status(500).send(err)
    }
}

export const addPainting = async (req: Request, res: Response) => {
   if (!req.files) return res.status(400).send({message: "Image is required"})
    try {
        const file = req.files.picture as UploadedFile
        const paintings = await PaintingsService.addPainting(req.body,file)
        res.status(200).send(paintings)
    } catch (err) {
        console.log(err)
        res.status(500).send(err)
    }
}