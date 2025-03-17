import '@/public/cart.svg'
import Link from 'next/link'
import { useRouter } from "next/router";
import { useCart } from '@/context/cartContext';
import { CartIcon } from '@/lib/icons/cartIcon';
import { FrenchFlagIcon } from '@/lib/icons/frenchFlagIcon';
import { EnglishFlagIcon } from '@/lib/icons/EnglishFlagIcon';
import { useTranslation } from 'next-i18next';

type Props = {
    children: React.ReactNode;
};

const Layout = ({children}: Props) => {
    const router = useRouter()
    const {cart} = useCart()
    const {t, i18n } = useTranslation('common')

    const changeLanguage = (lang: string) => {
        i18n.changeLanguage(lang)
        router.push(router.pathname, router.asPath, {locale: lang === 'fr' ? false : lang})
    }

    return (
     <div className='bg-[grey] text-stone-200 font-text'>
        <header className="flex text-[1.3rem] xs:text-[1.5rem] sm:text-[2.5rem] justify-center gap-3 sm:justify-between items-center pt-9 sm:mx-[4rem] pb-4 sm:pb-12">
        <nav className="flex gap-3 sm:gap-5 font-inspiration">
        <Link href={'/'} className={`${router.route === '/' ? 'border-b sm:border-b-4 border-stone-200' : 'border-b sm:border-b-4 border-transparent'}  hover:border-stone-200`}>
        {t('header_homepage')}</Link>
        <Link href={'/gallery'} className={`${router.route === '/gallery' ? 'border-b sm:border-b-4 border-stone-200' : 'border-b sm:border-b-4 border-transparent'}  hover:border-stone-200`}>
        {t('header_gallery')}</Link>
        <Link href={'/contact'} className={`${router.route === '/contact' ? 'border-b sm:border-b-4 border-stone-200' : 'border-b sm:border-b-4 border-transparent'} hover:border-stone-200`}>
        Contact</Link>
        </nav>
        <div className='flex items-center gap-2 md:gap-5'>
            <div className='flex gap-2 text-sm'>
            <div className='flex gap-1 hover:cursor-pointer'
            onClick={() => changeLanguage('fr')}
             >
            <p className='hidden md:block'>Français</p>
            <FrenchFlagIcon className={"w-[15px] h-[15px] sm:w-[20px] sm:h-[20px]"}/>
            </div>
            <div className='flex gap-1 hover:cursor-pointer'
             onClick={() => changeLanguage('en')}
            >
            <p className='hidden md:block'>English</p>
            <EnglishFlagIcon className={"w-[15px] h-[15px] sm:w-[20px] sm:h-[20px]"}/>
            </div>
            </div>
       <div className='relative'>
        <Link href={'/cart'}>
        <CartIcon className={"w-[30px] h-[23px] sm:w-[48px] sm:h-[41px]"}/>
       {cart.length > 0 && 
       <p className='absolute px-1 py-0.4 sm:px-2 sm:py-1 bg-red-500 rounded-full text-white text-[0.5rem] sm:text-[0.7rem] right-0 bottom-0'>
        {cart.length}
       </p>
       }
        </Link>
        </div>
        </div>
        </header>
        <div className='text-inspiration text-center text-[1.5rem] sm:text-[2.5rem] pb-8 [font-kerning:none] italic'>{t("header_title")}</div>
        <div className='min-h-screen'>{children}</div>
        <div className='p-12 bg-slate-400 text-right text-sm sm:text-[1.5rem] sm:mt-3'>Copyright © 2025 Bernard Resse</div>
     </div>
    )
}

export default Layout