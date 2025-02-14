import axios from "axios";
import { FormSchema } from "@/schemas/ContactsSchemas";

const URL = process.env.NEXT_PUBLIC_LOCAL_SERVER  + '/contacts'

export const post = async (contact: FormSchema) => {
    try {
        const { data } = await axios.post(URL, contact)
        return data
    } catch (err) {
        return err
    }
}