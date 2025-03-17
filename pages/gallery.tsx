import ComboBox from "@/lib/components/comboBox"
import ShowRoom from '@/components/showRoom';
import { useState, useEffect, useCallback } from 'react';
import Pagination from '@/lib/components/pagination';
import * as paintingsService from "../services/paintings.service"
import { getStaticPropsWithTranslations } from '@/hoc/serverSideProps';
import { useTranslation } from "next-i18next";

export const getStaticProps = getStaticPropsWithTranslations()

const Gallery = () => {
  const { t, i18n } = useTranslation('gallery')
  const [selectedTech, setSelectedTech] = useState("combobox_selected_all")
  const [selectedCategory, setSelectedCategory] = useState("combobox_selected_all")
  const [paintings, setPaintings] = useState([])
  const [paginationNumber, setPaginationNumber] = useState()
  const [page, setPage] = useState(1)

  const translater = (selected: string) => {
    return i18n.getFixedT('fr', 'gallery')(selected)
  }

  const fetchPaintings = useCallback(async () => {
    const translatedTech = translater(selectedTech)
    const translatedCat = translater(selectedCategory)
    const [paints, { total }] = await Promise.all([
      paintingsService.get(
        translatedTech === 'Tout' ? undefined : translatedTech,
        translatedCat === 'Tout' ? undefined : translatedCat,
        page
      ),
      paintingsService.count(
        translatedTech === 'Tout' ? undefined : translatedTech,
        translatedCat === 'Tout' ? undefined : translatedCat
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
        <p className="mt-7 hidden sm:block ">{t('combobox_orderby')}</p>
        <div className="flex gap-1 sm:gap-4">
         <ComboBox 
         label={t("combobox_label_technique")} 
         data={["combobox_selected_all","combobox_selected_oil", "combobox_selected_charcoal", "Pastel"]} 
         setPage={setPage}
         selected={t(selectedTech)} 
         setSelected={setSelectedTech}/>
         <ComboBox 
         setPage={setPage}
         label={t("combobox_label_category")} 
         data={["combobox_selected_all","combobox_selected_still_life", "combobox_selected_landscape", 'Portrait']} 
         selected={t(selectedCategory)} 
         setSelected={setSelectedCategory}/>
       </div>
     </div>
     <ShowRoom filter={{technique: translater(selectedTech), category: translater(selectedCategory)}} paintings={paintings}/>
     {paginationNumber !== undefined && paginationNumber > 12 && <Pagination items={paginationNumber} page={page} setPage={(e: any) => setPage(e)}/>}
       </>
    )
}

export default Gallery