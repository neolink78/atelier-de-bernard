import LeftArrow from "../icons/leftArrow"

const Pagination = (items) => {

    return (
        <div className="flex justify-center items-center gap-2 mt-[10rem] mb-3" >
                <div className="hover:cursor-pointer"><LeftArrow /></div>
1 2 3
<div className="hover:cursor-pointer transform -scale-x-100"><LeftArrow /></div>

        </div>
    )
}

export default Pagination