import { useCart } from "@/context/cartContext"
import { useRouter } from "next/router"
import  * as stripeApi from '@/services/api.service'
import { useEffect, useMemo } from "react"
import { ToastContainer, toast } from "react-toastify";
import { CartItems } from "@/components/cartItems"
import { getStaticPropsWithTranslations } from '@/hoc/serverSideProps';
import { useTranslation } from "next-i18next";

export const getStaticProps = getStaticPropsWithTranslations()

const Cart = () => {
    const router = useRouter()
    const { t } =useTranslation('cart')
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
             toast.success(t("cart_toast_success"), {
             position: "bottom-right",
             autoClose: 4000,
             pauseOnHover: false,
             theme: "dark",
            });
            clearCart()
        }
            else if(router.query.payment === 'failed' ) toast.error(t("cart_toast_failed"), {
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
        <p className="p-3" >{t("cart_description")} {cart.length > 0 ? ":" : t("cart_isempty")}</p>
        {cart.length > 0 && <button onClick={() => clearCart()} className="bg-black rounded-md px-3 py-1.5 hover:bg-stone-200 hover:text-black">{t("cart_removebutton")}</button>}
        </div>
       <CartItems />
        </div>
     {cart.length > 0 && <button 
        onClick={() => handleCheckout()}
        className="bg-black p-2 right-5 bottom-5 rounded-md fixed hover:bg-stone-200 hover:text-black">
            {t("cart_paybutton", {amount})}
        </button>}
        <ToastContainer />
        </>
    )
}

export default Cart