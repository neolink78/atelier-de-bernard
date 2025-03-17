import Image from "next/image";
import { useRouter } from "next/router";
import { ToastContainer, toast } from "react-toastify";
import LeftArrow from "@/lib/icons/leftArrow";
import { useState } from "react";
import { useCart } from "@/context/cartContext";
import * as PaintingsService from '@/services/paintings.service'
import { getStaticPropsWithTranslations } from '@/hoc/serverSideProps';
import { useTranslation } from "next-i18next";
import { GetStaticPaths } from "next";

type PaintingType = {
   id: number
   picture:string
   name: string
   technique: string
   category: string
   price: string
   description: string
}

export const getStaticProps = getStaticPropsWithTranslations()

export const getStaticPaths: GetStaticPaths<{ slug: string }> = async () => {
   return {
       paths: [],
       fallback: 'blocking'
   }
}

const PaintingId = () => {
   const router=useRouter()
   const { t } = useTranslation(['paintingId'])
   const [painting, setPainting] = useState<PaintingType>()
   const {addToCart, checkIfAdded, removeFromCart} = useCart()

    const fetchPainting = async () => {
      if (!router.query.id) return
      const paint = await PaintingsService.getById(Number(router.query.id))
      setPainting(paint)
    }

    fetchPainting()

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

   const addPaintingToCart = () => {
      if (!painting) return
      addToCart({
         id: painting.id,
         name: painting.name,
         price: painting.price,
         picture: painting.picture,
         technique: painting.technique,
         category: painting.category,
         description: painting.description
      })
      toast.success(t("painting_toast_added"), {
         position: "bottom-right",
         autoClose: 4000,
         pauseOnHover: false,
         theme: "dark",
         });
   }

   const removePaintingFromCart = () => {
      if (!painting) return
      removeFromCart(painting.id)
      toast.success(t("painting_toast_removed"), {
         position: "bottom-right",
         autoClose: 4000,
         pauseOnHover: false,
         theme: "dark",
         });
   }

 return painting && (
   <>
 <div className="xl:mx-[15rem]"> 
    <div onClick={() => router.push('/gallery')} 
    className="ml-5 xl:ml-0 flex gap-2 items-center justify-start hover:cursor-pointer w-fit hover:border-b-2 hover:border-stone-200 border-b-2 border-transparent"
    >
      <LeftArrow />
      <div className="flex gap-1">
        <p className="hidden sm:block">{t("painting_backto")}</p>
        <p>{t("painting_gallery")}</p>
      </div>
    </div>
    <div className="block sm:flex justify-center sm:gap-14 mt-2">
      <div className="sm:w-[30%] h-[10rem] sm:h-[40rem] relative">
     <Image 
     src={painting.picture}  
     fill
     sizes="(max-width: 1100px) 50vw, 33vw"
     style={{objectFit: "contain", objectPosition: 'top'}}
     alt={painting.name} />
     </div>
     <div className="mx-6 sm:mx-0 flex flex-col items-center sm:w-[50%] md:w-[30%] text-center">
    <p className="text-[1.5rem] sm:text-[2rem] italic">{painting.name}</p>
    <p className="text-[1rem] sm:text-[1.5rem] mt-1 sm:mt-0">{translateCategory(painting.category)}</p>
    <p className="text-[1rem] sm:text-[1.5rem]">{translateTechnique(painting.technique)}</p>
    <p className="mt-8">{painting.description}</p>
    <p className="mt-8">{painting.price} €</p>
    {checkIfAdded(painting.id) ? 
    <button className="bg-black p-2 w-[60%] sm:w-[80%] mt-8 rounded-md hover:bg-stone-200 hover:text-black" onClick={removePaintingFromCart} >{t("painting_button_removed")}</button> 
    : <button className="bg-black p-2 w-[60%] sm:w-[80%] mt-8 rounded-md hover:bg-stone-200 hover:text-black" onClick={addPaintingToCart} >{t("painting_button_added")}</button>}
     </div>
     </div>
 </div>
 <ToastContainer />
 </>
 )
}

export default PaintingId