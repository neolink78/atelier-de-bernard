import z from 'zod'

export const schema = z.object({
        firstname: z.string()
            .min(2, {message: "contact_name_tooshort"})
            .max(15, {message: "contact_name_toolong"})
            .regex(/^[A-Za-zÀ-ÖØ-öø-ÿ -]+$/, { message: "contact_name_nonumber" }),
        lastname: z.string()
            .min(2, {message: "contact_lastname_tooshort"})
            .max(50, {message: "contact_lastname_toolong"})
            .regex(/^[A-Za-zÀ-ÖØ-öø-ÿ -]+$/, { message: "contact_lastname_nonumber" }),
        mail: z.string().email({message: "contact_email_error"}),
        message: z.string()
         .min(5, {message: "contact_message_tooshort"})
         .max(300, {message: 'contact_message_toolong'})
    })

export type FormSchema = z.infer<typeof schema>;