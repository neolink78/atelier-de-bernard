import Image from "next/image"
import { useRouter } from "next/router";

const paintings = [{
    url:'/peinture_huile_morte_300.jpg',
    title: 'Pot de fleur',
    technique: "Peinture à l'huile",
    category: "Nature morte",
    price: "300"
},{
    url:'/peinture_huile_morte_300-2.jpg',
    title: 'Lavande sur un livre',
    technique: "Peinture à l'huile",
    category: "Nature morte",
    price: "300"
},{
    url:'/peinture_huile_paysage_300.jpg',
    title: 'Clachaloze',
    technique: "Peinture à l'huile",
    category: "Paysage",
    price: "300"
},{
    url:'/peinture_huile_paysage_300-2.jpg',
    title: 'Bord de mer',
    technique: "Peinture à l'huile",
    category: "Paysage",
    price: "300"
},{
    url:'/peinture_huile_paysage_300-3.jpg',
    title: 'Meules',
    technique: "Peinture à l'huile",
    category: "Paysage",
    price: "300"
},{
    url:'/peinture_huile_paysage_300-4.jpg',
    title: 'sortie de Tripleval',
    technique: "Peinture à l'huile",
    category: "Paysage",
    price: "300"
},{
    url:'/peinture_huile_paysage_300-5.jpg',
    title: 'Champs',
    technique: "Peinture à l'huile",
    category: "Paysage",
    price: "300"
},{
    url:'/peinture_huile_paysage_300-6.jpg',
    title: 'Chateau de La Roche Guyon',
    technique: "Peinture à l'huile",
    category: "Paysage",
    price: "300"
},{
    url:'/peinture_huile_portrait_300.jpg',
    title: 'Wolfgang Amadeus',
    technique: "Peinture à l'huile",
    category: "Portrait",
    price: "300"
},{
    url:'/peinture_huile_portrait_300.jpg',
    title: 'HAHAHAHA',
    technique: "Fusain",
    category: "Portrait",
    price: "300"
},{
    url:'/peinture_huile_portrait_300.jpg',
    title: 'HAHAHAHA',
    technique: "Pastel",
    category: "Portrait",
    price: "300"
}]

type ShowRoomType = {
    filter: {
        technique: string,
        category: string
    }
}

type PaintingType = {
    url:string
    title: string
    technique: string
    category: string
    price: string
}

const ShowRoom = ({filter}: ShowRoomType) => {
    console.log(filter)
    console.log(paintings.length)
    const router= useRouter()

    const test = (painting: PaintingType) => {
        if(filter.category === 'Tout' && filter.technique !== 'Tout') {
            return painting.technique === filter.technique
        } else if (filter.technique === 'Tout' && filter.category !== 'Tout') {
            return painting.category === filter.category
        } else if (filter.technique !== 'Tout' && filter.category !== 'Tout'){
            return painting.technique === filter.technique && painting.category === filter.category
        } else return true
    }

    return (
        <div className="grid grid-cols-4 gap-4= my-5">
       {paintings.filter(painting =>  test(painting)).map((painting, idx) => {
        return (
        <div 
        key={idx} 
        className="flex flex-col items-center justify-center text-center" 
        
        >
        <Image src={painting.url} width={300} height={300} alt={painting.title} onClick={() => router.push(`/paintings/${painting.title}`)} className="hover:cursor-pointer"/>
        <p>{painting.title}</p>
        <p>{painting.technique}</p>
        <p>{painting.price}€</p>
        </div>
       )})}
       </div>
    )
}

export default ShowRoom