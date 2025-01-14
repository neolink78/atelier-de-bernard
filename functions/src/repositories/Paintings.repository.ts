import { Painting } from '../schemas/Paintings.schema';
import prisma from "../db";

export const getAll = async (painting?: Painting) => {
   const result = await prisma.library.findMany({
        where: painting
    })
    return result
}

export const addPainting = async (painting: Painting, picture: string) => {
    const result = await prisma.library.create({
       data: {
        name: painting.name,
        price: painting.price,
        description: painting.description,
        picture,
        technique: painting.technique,
        category: painting.category
       }
    })
    return result
}