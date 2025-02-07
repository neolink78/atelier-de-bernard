import LeftArrow from "../icons/leftArrow"

const Pagination = ({items, page, setPage}: any) => {
    const calculation = () => {
        const totalPages = Math.ceil(items / 12)
        let startPage = Math.max(1, items - 5)
        let endPage = startPage + 5
        if (endPage > totalPages) {
            endPage = totalPages
            startPage = Math.max(1, endPage - 10 + 1)
        }

        return Array.from({ length: endPage - startPage + 1 }, (_, i) => ({
            label: `${startPage + i}`,
            value: startPage + i,
          }))
    }

    const seted = calculation()

    return (
        <div className="flex justify-center items-center gap-2 mt-[10rem] mb-3" >
                <div className={`hover:${page === 1 ? 'cursor-default' :'cursor-pointer'}`} onClick={() => page !== 1 && setPage(page - 1)}><LeftArrow /></div>
{seted.map(page => (
    <div key={page.label} onClick={() => setPage(page.value)} className="hover:cursor-pointer">
        {page.value}
    </div>
))}
<div className={`hover:${page === seted.length ? 'cursor-default' :'cursor-pointer'} transform -scale-x-100`} onClick={() => page < seted.length && setPage(page + 1)}><LeftArrow /></div>
        </div>
    )
}

export default Pagination