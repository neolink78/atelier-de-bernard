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
  const [paginationNumber, setPaginationNumber] = useState()
  const [page, setPage] = useState(1)

const paintingsGetter = async (selectedTech?: string, selectedCategory?: string, page?: number) => {
  const paints =await paintingsService.get(selectedTech, selectedCategory, page)
  setPaintings(paints)
}

const totalPaintings = async (selectedTech?: string, selectedCategory?: string) => {
  const {total} = await paintingsService.count(selectedTech, selectedCategory)
  setPaginationNumber(total)
}

  useEffect(() => {
   if (selectedTech !== 'Tout' && selectedCategory !== 'Tout' ) {
    paintingsGetter(selectedTech, selectedCategory, page)
    totalPaintings(selectedTech, selectedCategory)
  }
    else if (selectedTech !== 'Tout' && selectedCategory === 'Tout' ) {
      paintingsGetter(selectedTech, undefined, page)
      totalPaintings(selectedTech, undefined)
    }
    else if (selectedTech === 'Tout' && selectedCategory !== 'Tout' ) {
      paintingsGetter(undefined, selectedCategory, page)
      totalPaintings(undefined, selectedCategory)
    }else {
      paintingsGetter(undefined, undefined, page)
      totalPaintings(undefined, undefined)
    }
  },[selectedTech, selectedCategory, page])

  useEffect(() => {
    paintingsGetter()
    totalPaintings()
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
     {paginationNumber !== undefined && paginationNumber > 12 && <Pagination items={paginationNumber} page={page} setPage={(e: any) => setPage(e)}/>}
       </>
    )
}

export default Galery