import z from 'zod'

export const paintingsSchemas = z.object({
    id: z.number().optional(),
    name: z.string(),
    price: z.string().transform((val) => Number(val)),
    description: z.string().max(255),
    imageID: z.string().optional(),
    technique: z.enum(["Peinture à l'huile", "Fusain", "Pastel"]),
    category: z.enum(["Nature morte", "Paysage", "Portrait"])
})

export type Painting = z.infer<typeof paintingsSchemas>