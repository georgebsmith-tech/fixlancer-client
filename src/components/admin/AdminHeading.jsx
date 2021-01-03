import React from 'react'

export const AdminHeading = ({ title }) => {
    const style = {
        backgroundColor: "#eaecf4",
        borderRadius: 4
    }
    return (
        <h1
            className="padd10 font14 margin30-bottom margin20-top"
            style={style}>
            {title}
        </h1>
    )
}