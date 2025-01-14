import React from 'react';
import ComboBox from "@/lib/components/comboBox"
import ShowRoom from '@/components/showRoom';
import { useState } from 'react';
import Pagination from '@/lib/components/pagination';

const mock = [
    {
    label: 'Technique utilisée',
    value: ["Tout" ,"Peinture à l'huile", "Fusain", "Pastel"]
    },
    {
        label: 'Catégorie',
        value: ['Tout','Nature morte', 'Paysage', 'Portrait']
}]

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
},{
  url:'/peinture_huile_portrait_300.jpg',
  title: 'HAHAHAHA',
  technique: "Pastel",
  category: "Portrait",
  price: "300"
},{
  url:'/peinture_huile_portrait_300.jpg',
  title: 'HAHAHAHA',
  technique: "Pastel",
  category: "Portrait",
  price: "300"
},{
  url:'/peinture_huile_portrait_300.jpg',
  title: 'HAHAHAHA',
  technique: "Pastel",
  category: "Portrait",
  price: "300"
},{
  url:'/peinture_huile_portrait_300.jpg',
  title: 'HAHAHAHA',
  technique: "Pastel",
  category: "Portrait",
  price: "300"
},{
  url:'/peinture_huile_portrait_300.jpg',
  title: 'HAHAHAHA',
  technique: "Pastel",
  category: "Portrait",
  price: "300"
},{
  url:'/peinture_huile_portrait_300.jpg',
  title: 'HAHAHAHA',
  technique: "Pastel",
  category: "Portrait",
  price: "300"
},{
  url:'/peinture_huile_portrait_300.jpg',
  title: 'HAHAHAHA',
  technique: "Pastel",
  category: "Portrait",
  price: "300"
},{
  url:'/peinture_huile_portrait_300.jpg',
  title: 'HAHAHAHA',
  technique: "Pastel",
  category: "Portrait",
  price: "300"
},{
  url:'/peinture_huile_portrait_300.jpg',
  title: 'HAHAHAHA',
  technique: "Pastel",
  category: "Portrait",
  price: "300"
},{
  url:'/peinture_huile_portrait_300.jpg',
  title: 'HAHAHAHA',
  technique: "Pastel",
  category: "Portrait",
  price: "300"
},{
  url:'/peinture_huile_portrait_300.jpg',
  title: 'HAHAHAHA',
  technique: "Pastel",
  category: "Portrait",
  price: "300"
},{
  url:'/peinture_huile_portrait_300.jpg',
  title: 'HAHAHAHA',
  technique: "Pastel",
  category: "Portrait",
  price: "300"
}]

const Galery = () => {
  const [selectedTech, setSelectedTech] = useState('Tout')
  const [selectedCategory, setSelectedCategory] = useState('Tout')
  //const [page, setPage] = useState(1)
    return(
        <>
        <div className="flex justify-end mr-24 gap-3">
        <p className="mt-7">Trier par</p>
        <div className="flex gap-4">
         <ComboBox label={mock[0].label} data={mock[0].value} selected={selectedTech} setSelected={setSelectedTech}/>
         <ComboBox label={mock[1].label} data={mock[1].value} selected={selectedCategory} setSelected={setSelectedCategory}/>
       </div>
     </div>
     <ShowRoom filter={{technique: selectedTech, category: selectedCategory}} paintings={paintings}/>
     <Pagination items={paintings.length}/>
       </>
    )
}

export default Galery