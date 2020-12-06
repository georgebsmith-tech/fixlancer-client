import React from 'react'



export const Input=(props)=>{

    return (
        <div className="margin10-top">
        <input 
        type={props.type||"text"} className="input padd10 no-outline border-smooth full-width font16" placeholder={props.text}
        onChange={props.handleChange}
        />
   </div>
    )
}

