import { useRouter } from "next/router";
import LeftArrow from "@/lib/icons/leftArrow";
import React from "react";

const PaintingId = () => {
    const router=useRouter()
 return (
 <>
    <div onClick={() => router.push('/galery')} className="hover:cursor-pointer"><LeftArrow /></div>
    <div>Voulez vous acheter le tableau nommé {router.query.id}</div>
 </>
 )
}

export default PaintingId