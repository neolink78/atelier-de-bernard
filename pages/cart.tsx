import { useCart } from "@/context/cartContext"
import { useRouter } from "next/router"
import Image from "next/image"
import TrashIcon from '@/lib/icons/trashIcon'
import  * as stripeApi from '@/services/api.service'
import { useEffect } from "react"
import { ToastContainer, toast } from "react-toastify";

const Cart = () => {
    const router = useRouter()
    const {cart, removeFromCart, clearCart} = useCart()
    let amount = 0

     const handleCheckout = async () => {
            const processing = await stripeApi.post(cart)
            if (processing.url) {
                window.location.href = processing.url
            }
        }
    
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
            else if(router.query.payment === 'failed' ) toast.error('erreur', {
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
        <div className="sm:mx-[15rem]">
            <div className="flex justify-between items-center mb-5">
        <p className="p-3" >Votre panier {cart.length > 0 ? ":" : "est vide !"}</p>
        {cart.length > 0 && <button onClick={() => clearCart()} className="bg-white rounded-md px-3 py-1.5 hover:bg-black hover:text-white">Tout retirer</button>}
        </div>
       {cart.map((painting) => {
        amount += Number(painting.price)
        return (
        <div key={painting.id} className="w-full flex min-h-[12rem] bg-[#3a3a3a] rounded-md items-center text-white justify-between px-[3rem] mt-2">
            <div className="flex gap-8">
            <div className="w-[10rem] h-[8rem] relative">
           <Image 
                src={painting.picture}  
               fill
                objectFit="contain"
                alt={painting.name} />
               </div>
               <div className="flex flex-col gap-5 ml-2">
            <p>{painting.name}</p>
            <p>{painting.technique} - {painting.category}</p>
            <p className="hidden xl:block">{painting.description}</p>
            </div>
            </div>
            <div className="flex items-center gap-5">
            <p>{painting.price} €</p>
            <div className="hover:cursor-pointer" onClick={() => removeFromCart(painting.id)}>
            <TrashIcon />
            </div>
          </div>
        </div>
       )})}

        </div>
     {cart.length > 0 && <button 
        onClick={() => handleCheckout()}
        className="bg-white p-2 right-5 bottom-5 rounded-md fixed hover:bg-black hover:text-white">
            Procéder au paiement de {amount} € 
        </button>}
        <ToastContainer />
        </>
    )
}

export default Cart