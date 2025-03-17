import Image from "next/image"
import TrashIcon from "@/lib/icons/trashIcon"
import { useCart } from "@/context/cartContext"
import { useTranslation } from "next-i18next"

export const CartItems = () => {
  const { t } = useTranslation('cart')
    const {cart, removeFromCart} = useCart()

    const truncateTitle = (text: string) => {
        let charLimit;
        if (window.innerWidth < 340) {
            charLimit = 16;
          } else if (window.innerWidth < 460) {
            charLimit = 30;
          } else {
            charLimit = 50;
          }
        return text.length > charLimit ? text.slice(0, charLimit) + "..." : text;
    }

    const translateTechnique = (technique: string) => {
      switch (technique) {
          case "Peinture à l'huile":
              return t("selected_oil");
          case "Fusain":
              return t("selected_charcoal");
          case "Pastel":
              return "Pastel";
          default:
              return technique;
      }
  }

  const translateCategory = (technique: string) => {
   switch (technique) {
       case "Nature morte":
           return t("selected_still_life");
       case "Paysage":
           return t("selected_landscape");
       case "Portrait":
           return "Portrait";
       default:
           return technique;
   }
}

    return cart.map((painting) =>  (
            <div key={painting.id} className="w-full flex sm:min-h-[12rem] bg-[#3a3a3a] rounded-md items-center text-white justify-between px-2 sm:px-[3rem] mt-2">
                <div className="flex sm:gap-8 items-center justify-between w-full mr-3 py-2 ">
                    <div className="flex items-center">
                <div className="w-[9rem] sm:w-[10rem] h-[8rem] relative">
               <Image 
                    src={painting.picture}  
                   fill
                   sizes="full"
                    style={{objectFit: 'contain'}}
                    alt={painting.name} />
                   </div>
                   <div className="flex flex-col gap-5 ml-5 sm:ml-2 w-fit text-[0.8rem] ">
                <p>{truncateTitle(painting.name)}</p>
                <div className="md:flex sm:gap-1">
                <p>{translateTechnique(painting.technique)}</p>
                <p className="hidden md:block">-</p>
                <p>{translateCategory(painting.category)}</p>
                <p className="sm:hidden">{painting.price}€</p>
                </div>
                <p className="hidden md:block">{painting.description}</p>
                </div>
                </div>
                <div className="hover:cursor-pointer sm:hidden align-center " onClick={() => removeFromCart(painting.id)}>
                <TrashIcon width="20" height="26" />
                </div>
                </div>
                <div className="hidden sm:flex items-center gap-5">
                <p className="w-12">{painting.price} €</p>
                <div className="hover:cursor-pointer" onClick={() => removeFromCart(painting.id)}>
                <TrashIcon />
                </div>
              </div>
            </div>
           ))
}