import axios from "axios";


const URL = process.env.NEXT_PUBLIC_LOCAL_SERVER  + '/paintings'

export const get = async () => {
    try {
        const {data} = await axios.get(URL)
        return data
    } catch (err) {
        console.log(err)
    }
}