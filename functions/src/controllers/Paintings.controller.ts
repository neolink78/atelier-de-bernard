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

export const add = async (req: Request, res: Response) => {
   if (!req.files) throw new Error('Image is required');
    try {
       const file = req.files.picture as UploadedFile
        const paintings = await PaintingsService.add(req.body,file)
        res.status(200).send(paintings)
    } catch (err) {
        console.log(err)
        res.status(500).send(err)
    }
}

export const update = async (req: Request, res: Response): Promise<void> => {
    try {
        const { body } = req
        if (!body.imageID)  throw new Error('a Specific ID is missing');
        const paintings = await PaintingsService.update(body)
        res.status(200).send(paintings)
    } catch (err) {
        console.log(err)
        res.status(500).send(err)
    }
}