import React, { useState } from 'react'


const AdminMobileHeader = () => {
    const [menuIsOpen, setMenuIsOpen] = useState(false)
    const handleMenu = () => {
        setMenuIsOpen(!menuIsOpen)
    }
    const handleClick = () => {

    }
    return (
        <header>
            <ul className="flex-between padd20">
                <li>

                </li>
                <li>
                    <div className="flex-center" style={{ flexDirection: "row" }}>
                        <div
                            style={{ backgroundColor: "red" }}
                            className="username-icon2 margin10-right pointer">
                            I
                        </div>
                        <div>
                            <i className="fa fa-angle-down pointer"></i>
                        </div>
                    </div>
                </li>
            </ul>
        </header>
    )
}

export default AdminMobileHeader;

