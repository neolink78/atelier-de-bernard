import Image from "next/image"
import { useRouter } from "next/router";
import { useTranslation } from "next-i18next";

type PaintingType = {
    id: string
    picture: string
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


const ShowRoom = ({ filter, paintings }: ShowRoomType) => {
    const router = useRouter()
    const { t } = useTranslation('gallery')

    const filterType = (painting: PaintingType) => {
        if (filter.category === 'Tout' && filter.technique !== 'Tout') {
            return painting.technique === filter.technique
        } else if (filter.technique === 'Tout' && filter.category !== 'Tout') {
            return painting.category === filter.category
        } else if (filter.technique !== 'Tout' && filter.category !== 'Tout') {
            return painting.technique === filter.technique && painting.category === filter.category
        } else return true
    }

    const truncateTitle = (text: string) => {
        let charLimit;
        if (window.innerWidth < 350) {
            charLimit = 13;
        } else if (window.innerWidth < 750) {
            charLimit = 15;
        } else if (window.innerWidth < 980) {
            charLimit = 20;
        } else {
            charLimit = 30;
        }
        return text.length > charLimit ? text.slice(0, charLimit) + "..." : text;
    }

    const translateTechnique = (technique: string) => {
        switch (technique) {
            case "Peinture à l'huile":
                return t("combobox_selected_oil");
            case "Fusain":
                return t("combobox_selected_charcoal");
            case "Pastel":
                return "Pastel";
            default:
                return technique;
        }
    }

    return (
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-y-6 mt-8 2xl:mx-48 ">
            {paintings.filter(painting => filterType(painting)).map((painting, idx) => (
                <div
                    key={idx}
                    className="flex flex-col items-center justify-center text-center"
                >
                    <div className="relative w-[50%] 2xl:w-[60%] aspect-[2/3]">
                        <Image
                            className="hover:cursor-pointer z-0"
                            src={painting.picture}
                            fill
                            sizes="full"
                            style={{ objectFit: 'contain', objectPosition: 'bottom' }}
                            alt={painting.name}
                            onClick={() => router.push({
                                pathname: `/paintings/${painting.name.replace(/\s+/g, '-')}`,
                                query: { id: painting.id }
                            },
                                `/paintings/${painting.name.replace(/\s+/g, '-')}`
                            )}
                        />
                    </div>
                    <p className="mt-2 text-xl italic">{truncateTitle(painting.name)}</p>
                    <p>{translateTechnique(painting.technique)}</p>
                    <p>{painting.price}€</p>
                </div>
            ))}
        </div>
    )
}

export default ShowRoom