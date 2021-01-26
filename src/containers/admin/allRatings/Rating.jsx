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

export const RatingMobile = withRouter(({ rating, match, history }) => {

    return (
        <li
            className="border-smooth font14 padd10 margin5-bottom bg-white flex-between">

            <ul>



                <li
                    className="margin5-bottom relative">

                    <Link
                        title="View User profile"
                        to={`/u/${rating.username}`} className="text-link-with-hover"> {rating.username}
                    </Link>
                </li>
                <li
                    className="margin5-bottom">
                    <span> Email: </span>
                    {rating.email}
                </li>
                <li
                    className="margin5-bottom">
                    <span> Count: </span>
                    <Link
                        title={`View all ratings by ${rating.username}`}
                        to={`${match.url}/${rating.username}`} className="text-link-with-hover">{rating.count}</Link>

                </li>

            </ul>


            <i
                title={`View all Ratings by ${rating.username}`}
                onClick={() => { history.push(`${match.url}/${rating.username}`) }}

                className="fa fa-angle-right font40 text-green padd20 pointer"></i>





        </li>
    )
})
export const RatingDesktop = ({ rating }) => {
    const style = {
        grid7: {
            display: "grid",
            gridTemplateColumns: " 50px 1fr 1.5fr  repeat(2,1fr)",
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
                        {rating.username}
                    </Link>
                </li>

                <li
                >
                    {rating.email}
                </li>
                <li
                >
                    {rating.count}
                </li>
                <li>
                    <button className="padd5 border5-radius bg-dark-blue border-dark-blue text-white no-outline">Delete</button>
                </li>
            </ul>


        </li>
    )
}
