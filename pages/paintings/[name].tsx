import { useRouter } from "next/router";
import LeftArrow from "@/lib/icons/leftArrow";
import React, { useEffect, useState } from "react";
import * as PaintingsService from '@/services/paintings.service'
import Image from "next/image";

type PaintingType = {
   id: string
   picture:string
   name: string
   technique: string
   category: string
   price: string
   
}

const PaintingId = () => {
    const router=useRouter()
    const [painting, setPainting] = useState()
    
    const fetchPainting = async () => {
      if (!router.query.id) return
      const paint = await PaintingsService.getById(Number(router.query.id))
      setPainting(paint)
   }
   
   useEffect(() => {
      fetchPainting()
   },[])



 return painting && (
 <>
    <div onClick={() => router.push('/galery')} className="hover:cursor-pointer"><LeftArrow /></div>
    <div className="flex gap-8 ml-8">
     <Image src={painting.picture} width={300} height={300} alt={painting.name} />
     <div className="flex flex-col items-center">
    <p className="text-[2rem]">{painting.name}</p>
    <p className="mt-8">{painting.description}</p>
     </div>
     </div>
 </>
 )
}

export default PaintingId