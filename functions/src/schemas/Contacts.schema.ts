import z from 'zod'

export const contactsSchemas = z.object({
    firstname: z.string(),
    lastname: z.string(),
    mail: z.string(),
    message: z.string()
})

export type Contact = z.infer<typeof contactsSchemas>