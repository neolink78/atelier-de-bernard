import { useState } from "react"
import CollapseArrowDownIcon from "../icons/downArrow"

type ComboBoxType = {
    label: string
    data: string[]
    selected: string
    setSelected: (filters: string) => void
    setPage: (filters: number) => void
    
}

const ComboBox = ({label, data, selected, setSelected, setPage} : ComboBoxType) => {
    const [show, setShow] = useState(false)
    
    return (
        <div className="w-32 sm:w-40 ">
        <p className="text-[0.8rem] sm:text-[1rem]">{label}</p> 
        <div 
        className={`relative text-[0.8rem] flex items-center justify-between gap-2 bg-white px-2 py-1 rounded-t-md ${!show && 'rounded-b-md'} border border-black hover:cursor-pointer mt-1 sm:mt-0`} 
        onClick={() => setShow(!show)}
        >
            {selected} 
            <div className={`ease-in duration-200 ${!show && 'origin-center rotate-180'}`}>
                <CollapseArrowDownIcon />
                </div>
            </div>
            <div className={`absolute bg-white text-center w-32 sm:w-40 border border-black ${show ? "block rounded-b-md border-t-0" : "hidden"} z-10 `}>
    <div className="flex flex-col items-center">
        {data.map((value, idx) => (
            <p 
                key={idx} 
                className={`m-1 text-[0.8rem] inline-block bg-white border-b ${value === selected ? 'border-black  hover:cursor-default':'border-transparent hover:cursor-pointer'} hover:border-black`} 
                onClick={() => {
                    setSelected(value)
                    setShow(false)
                    setPage(1)
                }}
            >
                {value}
            </p>
        ))}
    </div>
</div>

        </div>
    )
}

export default ComboBox