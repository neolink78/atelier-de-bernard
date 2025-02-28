import ComboBox from "@/lib/components/comboBox"
import ShowRoom from '@/components/showRoom';
import { useState, useEffect, useCallback } from 'react';
import Pagination from '@/lib/components/pagination';
import * as paintingsService from "../services/paintings.service"

const Galery = () => {
  const [selectedTech, setSelectedTech] = useState('Tout')
  const [selectedCategory, setSelectedCategory] = useState('Tout')
  const [paintings, setPaintings] = useState([])
  const [paginationNumber, setPaginationNumber] = useState()
  const [page, setPage] = useState(1)

 const fetchPaintings = useCallback(async () => {
    const [paints, { total }] = await Promise.all([
      paintingsService.get(
        selectedTech === 'Tout' ? undefined : selectedTech,
        selectedCategory === 'Tout' ? undefined : selectedCategory,
        page
      ),
      paintingsService.count(
        selectedTech === 'Tout' ? undefined : selectedTech,
        selectedCategory === 'Tout' ? undefined : selectedCategory
      )
    ]);
    setPaintings(paints);
    setPaginationNumber(total);
  }, [selectedTech, selectedCategory, page]);

  useEffect(() => {
   fetchPaintings()
  },[fetchPaintings])

  useEffect(() => {
    window.scrollTo({top: 0, behavior: 'smooth'})
  },[page])

    return(
        <>
        <div className="flex justify-center sm:justify-end sm:mr-24 gap-3">
        <p className="mt-7 hidden sm:block ">Trier par</p>
        <div className="flex gap-1 sm:gap-4">
         <ComboBox 
         label={'Technique utilisée'} 
         data={["Tout" ,"Peinture à l'huile", "Fusain", "Pastel"]} 
         setPage={setPage}
         selected={selectedTech} 
         setSelected={setSelectedTech}/>
         <ComboBox 
         setPage={setPage}
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