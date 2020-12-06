import React,{Component} from 'react'

const ShadowCard=(props)=> {
  

        return ( 
            <div className="bg-white border-smooth" 
            style={
                {boxShadow: "0px 0.15rem 1.75rem 0px rgba(58, 59, 69, 0.15)"}
                }>
                {props.children}
               
            </div>
         );
  
}
 
export default ShadowCard;