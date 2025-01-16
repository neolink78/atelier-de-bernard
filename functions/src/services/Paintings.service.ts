import { Painting, paintingsSchemas } from '../schemas/Paintings.schema'
import * as PaintingsRepository from '../repositories/Paintings.repository'
import { UploadedFile } from 'express-fileupload'
import imageKit from '../imageKit'
import fs from 'fs'

export const getAll = async () => {
    const paintings = await PaintingsRepository.get()
    return paintings
}

export const add = async (body: Painting, picture: UploadedFile) => {
    try {
      const validatedData = paintingsSchemas.parse(body)
       const uploadFile = await imageKit.upload({
          file: fs.readFileSync(picture.tempFilePath),
          fileName: picture.name,
          folder: "/paintings",
        });
        const paintings = await PaintingsRepository.add(validatedData, uploadFile.fileId, uploadFile.url)
        return paintings
      } catch (error) {
        console.error(error);
      }
}

export const update = async (painting: Painting) => {
  const paintings = await PaintingsRepository.update(painting)
  return paintings
}