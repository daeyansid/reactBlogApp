import React,{useId} from "react";

function select({option,label,className,...props},ref) {
    const id = useId();
    return <div className="w-full">
            {label && <label htmlFor={id} className={` ${className}`}></label>}
            <select id={id} ref={ref} {...props} className={`px-3 py-2 rounded-lg bg-white text-black outline-none focus:bg-gray-50 duration-200 border border-gray-200 w-full ${className}`}>
            {option?.map((option) => {
                (<option key={option} value={option}>
                    {option}
                </option>)
            })}
            </select>
    </div>;
}

export default React.forwardRef(select);