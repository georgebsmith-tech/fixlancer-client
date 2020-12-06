import React from 'react'

export const Loading = ({ height, message }) => {
    return (
        <div
            style={{ width: "100%", height }} className="bg-white font20 flex-center">
            {message || "Loading"}...
        </div>
    )
}

Loading.defaultProps = {
    height: "100vh"
}

