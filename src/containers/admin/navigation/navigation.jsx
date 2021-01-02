import React from 'react'
import { Link } from "react-router-dom"


const Navigation = () => {
    return (
        <nav>
            <ul>
                <li><Link to="/admin/all-orders">
                    All orders

               </Link></li>
                <li><Link to="/admin/all-users">
                    All Users

               </Link></li>
            </ul>
        </nav>
    )
}



export default Navigation;