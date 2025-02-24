import Image from "next/image"

const Index = () => {
    return (
        <div className="flex items-center mx-[10rem] gap-[10rem]">
        <p className="w-[50%] text-[1.5rem]">
Bernard, un peintre à la retraite, a consacré toute sa vie à capturer la beauté intemporelle des paysages de Bennecourt, un petit village niché au bord de la Seine. Désormais à la retraite, il continue de peindre avec la même passion qu’au premier jour, mais avec une sérénité accrue. Ses toiles évoquent des scènes bucoliques : les méandres paisibles du fleuve, les reflets dorés des couchers de soleil sur l&apos;eau, et les collines verdoyantes qui entourent le village.
Bernard maîtrise parfaitement l’art des jeux de lumière, inspiré par les impressionnistes qui ont autrefois arpenté les mêmes terres. Ses tableaux reflètent une atmosphère douce, presque nostalgique, comme s&apos;il cherchait à figer des moments d&apos;éternité dans la toile. Aujourd&apos;hui, bien qu&apos;il ait pris du recul par rapport au monde de l&apos;art professionnel, il expose et vend ses œuvres lors des marchés locaux ou dans de petites galeries.
Sa retraite lui permet d’apprécier chaque coup de pinceau sans la pression des délais. Pour Bernard, chaque tableau vendu est l&apos;occasion de partager un fragment de son regard intime sur Bennecourt, un coin de paradis qu&apos;il chérit depuis toujours.
        </p>
        <div className="relative w-[45%] aspect-[2/3]">
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