import Image from "next/image"
import { useRouter } from "next/router";

type PaintingType = {
    id: string
    picture:string
    name: string
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
       {paintings.filter(painting =>  filterType(painting)).map((painting, idx) => (
        <div 
        key={idx} 
        className="flex flex-col items-center justify-center text-center" 
        >
        <Image 
        src={painting.picture} 
        width={300} 
        height={300} 
        alt={painting.name} 
        onClick={() => router.push({
            pathname:`/paintings/${painting.name.replace(/\s+/g, '-')}`,
            query: {id: painting.id} 
        },
            `/paintings/${painting.name.replace(/\s+/g, '-')}`
        )} 
        className="hover:cursor-pointer"
        />
        <p>{painting.name}</p>
        <p>{painting.technique}</p>
        <p>{painting.price}€</p>
        </div>
       ))}
       </div>
    )
}

export default ShowRoom