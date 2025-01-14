import LeftArrow from "../icons/leftArrow"
/* eslint-disable */
const Pagination = ({items}: any) => {
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
            value: `${startPage + i}`,
          }))
    }

    const seted = calculation()
console.log(seted)
    return (
        <div className="flex justify-center items-center gap-2 mt-[10rem] mb-3" >
                <div className="hover:cursor-pointer"><LeftArrow /></div>
{seted.map(page => (
    <div key={page.label}>
        {page.value}
    </div>
))}
<div className="hover:cursor-pointer transform -scale-x-100"><LeftArrow /></div>

        </div>
    )
}

export default Pagination