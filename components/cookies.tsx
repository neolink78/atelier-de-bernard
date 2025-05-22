import Cookies from 'js-cookie'

type CartItem = {
    id: number,
    name: string
    price: string,
    picture: string
    technique: string
    category: string
    description: string
}

export const getCookies = () => {
    const storedCart = Cookies.get("cart")
    return storedCart ? JSON.parse(storedCart) : []
}

export const setCookies = (cart: CartItem[]) => {
    if (cart.length > 0) Cookies.set("cart", JSON.stringify(cart), { expires: 2 })
    else Cookies.remove("cart")
}