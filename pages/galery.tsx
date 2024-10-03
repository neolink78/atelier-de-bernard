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

const Galery = () => {
  const [selectedTech, setSelectedTech] = useState('Tout')
  const [selectedCategory, setSelectedCategory] = useState('Tout')
  const [page, setPage] = useState(1)
    return(
        <>
        <div className="flex justify-end mr-24 gap-3">
        <p className="mt-7">Trier par</p>
        <div className="flex gap-4">
         <ComboBox label={mock[0].label} data={mock[0].value} selected={selectedTech} setSelected={setSelectedTech}/>
         <ComboBox label={mock[1].label} data={mock[1].value} selected={selectedCategory} setSelected={setSelectedCategory}/>
       </div>
     </div>
     <ShowRoom filter={{technique: selectedTech, category: selectedCategory}}/>
     <Pagination />
       </>
    )
}

export default Galery