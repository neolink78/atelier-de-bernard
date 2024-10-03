import '@/public/cart.svg'
import React from 'react';
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from "next/router";

type Props = {
    children: React.ReactNode;
};

const Layout = ({children}: Props) => {
    const router = useRouter()
    return (
     <div className='bg-[grey]'>
        <div className="flex text-[2.5rem] justify-between items-center font-inspiration pt-9 ml-[3rem] mr-[4rem] pb-12">
        <div className="flex gap-5">
        <Link href={'/'} className={`${router.route === '/' ? 'border-b-4 border-black' : 'border-b-4 border-transparent'}  hover:border-black`}>Accueil</Link>
        <Link href={'/galery'} className={`${router.route === '/galery' ? 'border-b-4 border-black' : 'border-b-4 border-transparent'}  hover:border-black`}>Galerie</Link>
        <Link href={'/contact'} className={`${router.route === '/contact' ? 'border-b-4 border-black' : 'border-b-4 border-transparent'} hover:border-black`}>Contact</Link>
        </div>
        <Link href={'/cart'}><Image src="/cart.svg" width={50} height={50} alt="cart"/></Link>
        </div>
        <div className='text-center text-[3rem]'>~L&apos;atelier de Bernard~</div>
        <div className='min-h-screen mt-20'>{children}</div>
        <div className='p-12 bg-slate-400 text-right'>Copyright © 2024 Bernard Resse</div>
     </div>
    )
}

export default Layout