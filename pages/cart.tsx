import { useCart } from "@/context/cartContext"
import { useRouter } from "next/router"
import  * as stripeApi from '@/services/api.service'
import { useEffect, useMemo } from "react"
import { ToastContainer, toast } from "react-toastify";
import { CartItems } from "@/components/cartItems"

const Cart = () => {
    const router = useRouter()
    const {cart, clearCart} = useCart()

     const handleCheckout = async () => {
            const processing = await stripeApi.post(cart)
            if (processing.url) {
                window.location.href = processing.url
            }
        }

    const amount = useMemo(() => cart.reduce((total, item) => total + Number(item.price), 0), [cart])
    
    useEffect(() => {
       if(router.query.payment) {
            if(router.query.payment === 'success') {
             toast.success('Paiement effectué', {
             position: "bottom-right",
             autoClose: 4000,
             pauseOnHover: false,
             theme: "dark",
            });
            clearCart()
        }
            else if(router.query.payment === 'failed' ) toast.error('Veuillez réessayer', {
             position: "bottom-right",
             autoClose: 4000,
             pauseOnHover: false,
             theme: "dark",
            });
        setTimeout(() => {
            router.replace('/cart', undefined, { shallow: true });
        }, 1000)
    }
    },[router.query.payment])

    return(
        <>
        <div className={`mx-2 sm:mx-[6rem] xl:mx-[15rem] ${cart.length > 3 && 'pb-20'}`}>
            <div className="flex justify-between items-center mb-5">
        <p className="p-3" >Votre panier {cart.length > 0 ? ":" : "est vide !"}</p>
        {cart.length > 0 && <button onClick={() => clearCart()} className="bg-black rounded-md px-3 py-1.5 hover:bg-stone-200 hover:text-black">Tout retirer</button>}
        </div>
       <CartItems />
        </div>
     {cart.length > 0 && <button 
        onClick={() => handleCheckout()}
        className="bg-black p-2 right-5 bottom-5 rounded-md fixed hover:bg-stone-200 hover:text-black">
            Procéder au paiement de {amount} € 
        </button>}
        <ToastContainer />
        </>
    )
}

export default Cart