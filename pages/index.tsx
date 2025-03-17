import Image from "next/image"
import { getStaticPropsWithTranslations } from '@/hoc/serverSideProps';
import { useTranslation } from "next-i18next";

export const getStaticProps = getStaticPropsWithTranslations()

const Index = () => {
        const { t } = useTranslation('index')
    return (
        <div className="flex flex-col-reverse sm:flex-row justify-center items-center  sm:gap-5 max-w-[1920px] mx-auto sm:mt-[6rem] xl:mt-0 ">
        <p className=" sm:w-[30%] mx-3 sm:mx-0 sm:min-w-[25rem] xl:min-w-[35rem]  text-sm sm:text-[1rem] md:text-[1.5rem] leading-6 xl:leading-8">
        {t("index_description")}
        </p>
        <div className="relative w-[30%] max-w-[600px] xl:min-w-[25rem] aspect-[2/3]">
        <Image 
        src="/profile.svg" 
        fill
        style={{ objectFit: "contain" }}
        alt="profile"/>
        </div>
        </div>
    
)
}

export default Index