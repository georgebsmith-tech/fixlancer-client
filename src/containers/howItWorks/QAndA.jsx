import React, { useState } from 'react'

const QAndA = ({ qAndA }) => {
    const [open, setOpen] = useState(false)
    const handleToggle = () => {
        setOpen(!open)
    }

    return (
        <div className="pointer border1-grey">
            <h4
                className={"how-it-works-q bg-hover-grey  " + (open ? "bg-darkgrey" : "")}
                onClick={handleToggle}

            >
                <span>{qAndA.question}</span>

                <span>{!open ? "+" : "-"}</span>

            </h4>



            <p class={"center-text font14 " + (!open ? "hide" : "")}>
                {qAndA.answers[0]}

            </p>

        </div>

    )
}

export default QAndA;