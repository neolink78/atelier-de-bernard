import { Painting } from '../schemas/Paintings.schema';
import prisma from "../db";

export const get = async (painting?: Painting) => {
   const result = await prisma.library.findMany({
        where: painting,
        select: {
            id: true,
            name: true,
            price: true,
            description: true,
            picture: true,
            technique: true,
            category: true
        }
    })
    return result
}

export const add = async (painting: Painting,imageID: string, picture: string) => {
    const result = await prisma.library.create({
       data: {
        name: painting.name,
        price: painting.price,
        description: painting.description,
        picture,
        imageID, 
        technique: painting.technique,
        category: painting.category
       }
    })
    return result
}

export const update = async (painting: Painting) => {
    const result = await prisma.library.update({
         where:{imageID: painting.imageID},
         data: painting
     })
     return result
 }