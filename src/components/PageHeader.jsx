import React from 'react';
import { Link } from 'react-router-dom'

const PageHeader = ({ title, background }) => {
    const bgColor = background || "white"
    return (
        <header className={`center-text padd30 padd10-bottom`} style={{ backgroundColor: bgColor }}>
            <div className="flex-center">
                <Link to="/">
                    <img src="../../images/logo.png" style={{ width: 140 }} alt="" />

                </Link>


            </div>
            <div className="margin50-top">
                <h1 style={{ fontSize: "2.2rem" }}>{title}</h1>

            </div>
        </header>
    )
}


export default PageHeader