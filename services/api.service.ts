import axios from "axios";

type CartItem = {
    id: number,
    name: string
    price: string,
    picture: string
    technique: string
    category: string
    description: string
}


const URL = process.env.NEXT_PUBLIC_LOCAL_SERVER  + '/api'

export const post = async (paintings: CartItem[]) => {
    try {
        const { data } = await axios.post(URL, {items: paintings})
        return data
    } catch (err) {
        console.log(err)
        return err
    }
}