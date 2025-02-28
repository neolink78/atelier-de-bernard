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
        <header className="flex text-[1.5rem] sm:text-[2.5rem] justify-center gap-3 sm:justify-between items-center pt-9 sm:mx-[4rem] pb-4 sm:pb-12">
        <nav className="flex gap-5 font-inspiration">
        <Link href={'/'} className={`${router.route === '/' ? 'border-b sm:border-b-4 border-black' : 'border-b sm:border-b-4 border-transparent'}  hover:border-black`}>Accueil</Link>
        <Link href={'/galery'} className={`${router.route === '/galery' ? 'border-b sm:border-b-4 border-black' : 'border-b sm:border-b-4 border-transparent'}  hover:border-black`}>Galerie</Link>
        <Link href={'/contact'} className={`${router.route === '/contact' ? 'border-b sm:border-b-4 border-black' : 'border-b sm:border-b-4 border-transparent'} hover:border-black`}>Contact</Link>
        </nav>
       <div className='relative w-6 h-6 sm:w-[2.5rem] sm:h-[2.5rem] '>
        <Link href={'/cart'}>
        <Image src="/cart.svg" fill style={{objectFit:'contain'}} alt="cart"/>
       {cart.length > 0 && 
       <p className='absolute sm:px-2.5 px-1 py-0.4 sm:py-1 bg-red-500 rounded-full text-white text-[0.5rem] sm:text-[0.7rem] right-0 bottom-0'>
        {cart.length}
       </p>
       }
        </Link>
        </div>
        </header>
        <div className='text-center text-[1.5rem] sm:text-[2.5rem] pb-8'>~L&apos;atelier de Bernard~</div>
        <div className='min-h-screen'>{children}</div>
        <div className='p-12 bg-slate-400 text-right text-sm sm:text-[1.5rem] sm:mt-3'>Copyright © 2025 Bernard Resse</div>
     </div>
    )
}

export default Layout