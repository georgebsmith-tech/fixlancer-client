import React, { useState } from 'react'


const AdminMobileHeader = ({ openNav }) => {


    const handleClick = () => {

    }
    return (
        <header className="" style={{ boxShadow: "0px 4px 8px 2px #f2f2f2" }}>
            <div className="flex-between padd20">
                <div>
                    <img src={"../../../../public/images/logo.png"} alt="" />
                </div>
                <div
                    onClick={openNav}
                    className="font28 pointer">
                    &#9776;
        </div>
            </div>

        </header>
    )
}

export default AdminMobileHeader;

