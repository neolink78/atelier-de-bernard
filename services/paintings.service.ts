import axios from "axios";


const URL = process.env.NEXT_PUBLIC_LOCAL_SERVER  + '/paintings'

export const get = async (technique?: string, category?: string, page?: number) => {
    try {
        const {data} = await axios.get(`${URL}/getByType?category=${category}&technique=${technique}&page=${page}`)
        return data
    } catch (err) {
        console.log(err)
    }
}

export const count = async (technique?: string, category?: string) => {
    try {
        const { data } = await axios.get(`${URL}/pages?technique=${technique}&category=${category}`)
        return data
    } catch (err) {
        console.log(err)
    }
}