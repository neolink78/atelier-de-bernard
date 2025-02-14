import z from 'zod'

export const schema = z.object({
        firstname: z.string()
            .min(2, {message: "Votre prénom doit contenir au moins 2 lettres"})
            .max(15, {message: "Votre prénom est trop long"}),
        lastname: z.string()
            .min(2, {message: "Votre nom doit contenir au moins 2 lettres"})
            .max(50, {message: "votre nom est trop long"}),
        mail: z.string().email({message: "Ce format d'email n'est pas valide"}),
        message: z.string()
         .min(5, {message: "Veuillez taper au moins 5 caractères"})
         .max(300, {message: 'limite de caractères atteinte'})
    })

export type FormSchema = z.infer<typeof schema>;