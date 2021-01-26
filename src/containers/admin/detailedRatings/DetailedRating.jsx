import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { getDate } from '../../../helperFunctions/getDate'
import { withRouter } from 'react-router-dom'
import axios from "axios"
import { domain } from '../../../helperFunctions/domain'

const style = {
    actionButton: {
        position: "absolute",
        right: -10,
        top: -10,
        backgroundColor: "rgba(0,0,0,0.04)"
    },
    actionMenu: {
        position: "absolute",
        backgroundColor: "#fff",
        padding: 10,
        borderRadius: 5
    },
    actionItem: {
        color: "rgba(0,0,0,0.3)",
        marginTop: 5,
        marginBottom: 5

    }
}

export const DetailRatingMobile = withRouter(({ rating, history }) => {
    const [showAction, setShowAction] = useState(false)


    return (
        <li
            className="border-smooth font14 padd10 margin5-bottom bg-white">
            <ul onMouseEnter={() => setShowAction(true)} onMouseLeave={() => setShowAction(false)}>



                <li
                    className="margin5-bottom relative">
                    <span>Buyer:</span>

                    <Link
                        to={`/u/${rating.username}`} className="text-link-with-hover"> {rating.username}
                    </Link>
                </li>
                <li
                    className="margin5-bottom">
                    <span> Rating: </span>
                    {rating.rating}
                </li>

                <li
                    className="margin5-bottom">
                    <span> Review: </span>
                    <span title={rating.review}>{rating.review.substr(0, 42)}...</span>


                </li>
                <li
                    className="margin5-bottom">
                    <span> Submitted: </span>
                    {getDate(rating.createdAt)}

                </li>


            </ul>


        </li>
    )
})
export const DetailRatingDesktop = ({ rating }) => {
    const style = {
        grid7: {
            display: "grid",
            gridTemplateColumns: " 50px repeat(5,1fr) 100px",
            alignItems: "center"
        }
    }
    return (
        <li
            className="font14 padd10 margin5-bottom bg-white">
            <ul style={style.grid7}>
                <li></li>
                <li
                >
                    <span>  </span>
                    <Link
                        to={`/u/${rating.username}`}
                        className="text-link-with-hover">
                        {rating.ratingname}
                    </Link>
                </li>
                <li>
                    {getDate(rating.createdAt)}
                </li>
                <li
                >
                    {rating.phone}

                </li>
                <li
                >
                    {rating.email}
                </li>
                <li
                >
                    <span> Last Seen: </span>
                     3h
                </li>
                <li>
                    <button className="padd5 border5-radius bg-dark-blue border-dark-blue text-white no-outline">Delete</button>
                </li>
            </ul>


        </li>
    )
}
