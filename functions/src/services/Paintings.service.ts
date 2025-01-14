import { Painting, paintingsSchemas } from '../schemas/Paintings.schema'

import imageKit from '../imageKit'
import * as PaintingsRepository from '../repositories/Paintings.repository'
import { UploadedFile } from 'express-fileupload'
import fs from 'fs'

export const getAll = async () => {
    const paintings = await PaintingsRepository.getAll()
    return paintings
}

export const addPainting = async (body: Painting, picture: UploadedFile) => {
    try {
      const validatedData = paintingsSchemas.parse(body)
       const uploadFile = await imageKit.upload({
          file: fs.readFileSync(picture.tempFilePath),
          fileName: picture.name,
          folder: "/paintings",
        });
        const paintings = await PaintingsRepository.addPainting(validatedData, uploadFile.url)
        return paintings
      } catch (error) {
        console.error(error);
      }
}
