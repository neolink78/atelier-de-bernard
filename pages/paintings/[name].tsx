import { useRouter } from "next/router";
import LeftArrow from "@/lib/icons/leftArrow";
import React, { useCallback, useEffect, useState } from "react";
import * as PaintingsService from '@/services/paintings.service'
import Image from "next/image";

type PaintingType = {
   id: string
   picture:string
   name: string
   technique: string
   category: string
   price: string
   description: string
   
}

const PaintingId = () => {
    const router=useRouter()
    const [painting, setPainting] = useState<PaintingType>()
    
    const fetchPainting = useCallback(async () => {
      if (!router.query.id) return
      const paint = await PaintingsService.getById(Number(router.query.id))
      setPainting(paint)
   },[router.query])

   useEffect(() => {
      fetchPainting()
   },[])
   


console.log(painting)
 return painting && (
 <div className="mx-[15rem]"> 
    <div onClick={() => router.push('/galery')} 
    className="flex gap-2 items-center justify-start hover:cursor-pointer w-fit hover:border-b-2 hover:border-black border-b-2 border-transparent"
    >
      <LeftArrow />
      Retourner dans la galerie
    </div>
    <div className="flex justify-center gap-2 mt-2">
      <div className=" w-[30%] h-[40rem] relative">
     <Image 
     src={painting.picture}  
     fill
     objectPosition="top"
     objectFit="contain"
     alt={painting.name} />
     </div>
     <div className="flex flex-col items-center w-[30%]">
    <p className="text-[2rem]">{painting.name}</p>
    <p className="text-[1.5rem]">{painting.category}</p>
    <p className="text-[1.5rem]">{painting.technique}</p>
    <p className="mt-8">{painting.description}</p>
    <p className="mt-8">{painting.price}€</p>
     </div>
     </div>
 </div>
 )
}

export default PaintingId