import '@/public/cart.svg'
import React from 'react';
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from "next/router";
import { useCart } from '@/context/cartContext';

type Props = {
    children: React.ReactNode;
};

const Layout = ({children}: Props) => {
    const router = useRouter()
    const {cart} = useCart()

    return (
     <div className='bg-[grey]'>
        <div className="flex text-[2.5rem] justify-between items-center font-inspiration pt-9 ml-[3rem] mr-[4rem] pb-12">
        <div className="flex gap-5">
        <Link href={'/'} className={`${router.route === '/' ? 'border-b-4 border-black' : 'border-b-4 border-transparent'}  hover:border-black`}>Accueil</Link>
        <Link href={'/galery'} className={`${router.route === '/galery' ? 'border-b-4 border-black' : 'border-b-4 border-transparent'}  hover:border-black`}>Galerie</Link>
        <Link href={'/contact'} className={`${router.route === '/contact' ? 'border-b-4 border-black' : 'border-b-4 border-transparent'} hover:border-black`}>Contact</Link>
        </div>
       <div className='relative'>
        <Link href={'/cart'}>
        <Image src="/cart.svg" width={50} height={50} alt="cart"/>
       {cart.length > 0 && 
       <p className='absolute px-2.5 py-1 bg-red-500 rounded-full text-white text-[0.7rem] right-0 bottom-0'>
        {cart.length}
       </p>}
        </Link>
        </div>
        </div>
        <div className='text-center text-[3rem]'>~L&apos;atelier de Bernard~</div>
        <div className='min-h-screen mt-20'>{children}</div>
        <div className='p-12 bg-slate-400 text-right'>Copyright © 2025 Bernard Resse</div>
     </div>
    )
}

export default Layout