import React from 'react';
import ComboBox from "@/lib/components/comboBox"
import ShowRoom from '@/components/showRoom';
import { useState, useEffect } from 'react';
import Pagination from '@/lib/components/pagination';
import * as paintingsService from "../services/paintings.service"

const Galery = () => {
  const [selectedTech, setSelectedTech] = useState('Tout')
  const [selectedCategory, setSelectedCategory] = useState('Tout')
  const [paintings, setPaintings] = useState([])

const paintingsGetter = async () => {
  const paints =await paintingsService.get()
  setPaintings(paints)
}

  useEffect(() => {
      paintingsGetter()
  },[])

    return(
        <>
        <div className="flex justify-end mr-24 gap-3">
        <p className="mt-7">Trier par</p>
        <div className="flex gap-4">
         <ComboBox 
         label={'Technique utilisée'} 
         data={["Tout" ,"Peinture à l'huile", "Fusain", "Pastel"]} 
         selected={selectedTech} 
         setSelected={setSelectedTech}/>
         <ComboBox 
         label={'Catégorie'} 
         data={['Tout','Nature morte', 'Paysage', 'Portrait']} 
         selected={selectedCategory} 
         setSelected={setSelectedCategory}/>
       </div>
     </div>
     <ShowRoom filter={{technique: selectedTech, category: selectedCategory}} paintings={paintings}/>
     <Pagination items={paintings.length}/>
       </>
    )
}

export default Galery