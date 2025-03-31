import axios from "axios";
import { FormSchema } from "@/schemas/ContactsSchemas";

const URL = process.env.NEXT_PUBLIC_LOCAL_SERVER  + '/contacts'

export const post = async (contact: FormSchema) => {
    try {
        const result = await axios.post(URL, contact)
        return result
    } catch (err) {
        return err
    }
}