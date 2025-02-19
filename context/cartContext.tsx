import {createContext, useContext, useState} from "react"

type CartItem = {
    id: number,
    name: string
    price: string,
    picture: string
    technique: string
    category: string
    description: string
}

type CartContextType = {
    cart: CartItem[]
    addToCart: (item: CartItem) => void
    removeFromCart: (id: number) => void
    clearCart: () => void
    checkIfAdded: (id: number) => boolean
}

const CartContext = createContext<CartContextType | undefined>(undefined)

export const CartProvider: React.FC<{children: React.ReactNode}> = ({children}) => {
    const [cart, setCart] = useState<CartItem[]>([])

    const addToCart = (item: CartItem) => {
        setCart((oldCart) => {
            const itemexists = oldCart.find((painting) => painting.id === item.id)
            if (itemexists) return oldCart 
            return [...oldCart, item]
        })
    }

    const removeFromCart = (id: number) => {
        setCart((oldCart) => oldCart.filter((item) => item.id !== id))
    }

    const clearCart = () => {
        setCart([])
    }

    const checkIfAdded = (id: number) => {
        const isAdded = cart.find(painting => painting.id === id)
        if (isAdded) return true
        return false
    }

    return (
        <CartContext.Provider value={{cart, addToCart, removeFromCart, clearCart, checkIfAdded}}>
            {children}
        </CartContext.Provider>
    )
}

export const useCart = () => {
    const context = useContext(CartContext)
    if (!context) throw new Error('useCart must be used within a cart provider')
        return context
}