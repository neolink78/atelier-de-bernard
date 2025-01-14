import Image from "next/image"
import { useRouter } from "next/router";

type PaintingType = {
    url:string
    title: string
    technique: string
    category: string
    price: string
    
}
type ShowRoomType = {
    filter: {
        technique: string,
        category: string
    }
    paintings: PaintingType[]
}


const ShowRoom = ({filter, paintings}: ShowRoomType) => {
    console.log(filter)
    console.log(paintings.length)
    const router= useRouter()

    const filterType = (painting: PaintingType) => {
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
       {paintings.filter(painting =>  filterType(painting)).map((painting, idx) => {
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