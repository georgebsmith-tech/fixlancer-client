import React from 'react'



export const Input = ({ text, handleChange, type, value }) => {

    return (
        <div className="margin10-top">
            <input
                value={value}
                type={type || "text"} className="input padd10 no-outline border-smooth full-width font16" placeholder={text}
                onChange={handleChange}
            />
        </div>
    )
}

