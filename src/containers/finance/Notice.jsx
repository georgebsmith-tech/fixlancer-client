import React, { useState, useEffect } from 'react'
import { getDate } from '../../helperFunctions/getDate'
import { Link } from 'react-router-dom'

const Notice = ({ notice }) => {

    const theClass = notice.read ? "" : "unread-notice"
    let message;
    if (notice.type === "offer") {
        message = <div>A new offer price of <strong className="bold">₦{notice.content.price}</strong> by
        <strong
                className="bold"> {notice.content.username}
            </strong>has been placed on your job request:
            <strong
                className="bold">
                notice.content.title
                </strong>. Click here to
        view.
    </div>
    } else if (notice.type === "new order") {
        message = <div>
            Thanks for your order! Click
            here to
            provide the necessary details to the seller (
        <strong
                className="bold"> {notice.content.from} </strong>) so that your order can start.
    </div>
    } else if (notice.type === "milestone") {
        message = <div>
            ₦{notice.content.amount}  credited for milestone released for the order
        <strong class="bold"> {notice.content.title}</strong>
        </div>
    } else if (notice.type === "new sale") {
        message = <div>
            Good News! You have a new order from
        <strong class="bold"> {notice.content.from}.</strong>
        </div>
    }
    return (
        <li
            className="notifications font14 margin1-bottom">
            <Link to={`/dashboard/${notice.content.slug}`}
                className={theClass + " block padd10"}>          {message}

                <div
                    className="flex-end font12 margin5-top">
                    <em>
                        {getDate(notice.createdAt)}
                    </em>

                </div>


            </Link>

        </li>
    )
}
export default Notice;
