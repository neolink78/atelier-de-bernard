import Image from "next/image"

const Index = () => {
    return (
        <div className="flex flex-col-reverse sm:flex-row justify-center items-center  sm:gap-5 max-w-[1920px] mx-auto sm:mt-[6rem] xl:mt-0 ">
        <p className=" sm:w-[30%] mx-3 sm:mx-0 sm:min-w-[25rem] xl:min-w-[35rem]  text-sm sm:text-[1rem] md:text-[1.5rem] leading-6 xl:leading-8">
Bernard a consacré toute sa vie à capturer la beauté intemporelle des paysages de Bennecourt, un petit village niché au bord de la Seine. Ses toiles évoquent des scènes bucoliques : les méandres paisibles du fleuve, les reflets dorés des couchers de soleil sur l&apos;eau, et les collines verdoyantes qui entourent le village.
Bernard maîtrise parfaitement l’art des jeux de lumière, inspiré par les impressionnistes qui ont autrefois arpenté les mêmes terres. Ses tableaux reflètent une atmosphère douce, presque nostalgique, comme s&apos;il cherchait à figer des moments d&apos;éternité dans la toile.
Sa retraite lui permet d’apprécier chaque coup de pinceau sans la pression des délais. Pour Bernard, chaque tableau vendu est l&apos;occasion de partager un fragment de son regard intime sur Bennecourt, un coin de paradis qu&apos;il chérit depuis toujours.
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