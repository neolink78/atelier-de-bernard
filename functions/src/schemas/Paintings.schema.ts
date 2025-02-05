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

export const filtersSchemas = z.object({
    technique: z.enum(["Peinture à l'huile", "Fusain", "Pastel"]).optional(),
    category: z.enum(["Nature morte", "Paysage", "Portrait"]).optional(),
    page: z.number().optional(),
})

export type Painting = z.infer<typeof paintingsSchemas>
export type Filters = z.infer<typeof filtersSchemas>