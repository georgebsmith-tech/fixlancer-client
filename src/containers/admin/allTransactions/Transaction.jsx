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

export const TransactionMobile = withRouter(({ transaction, match, history }) => {




    return (
        <li
            className="border-smooth font14 padd10 margin5-bottom bg-white flex-between">
            <ul>



                <li
                    className="margin5-bottom relative">

                    <Link
                        title="View User profile"
                        to={`/u/${transaction.username}`} className="text-link-with-hover"> {transaction.username}
                    </Link>
                </li>
                <li
                    className="margin5-bottom">
                    <span> Email: </span>
                    {transaction.email}
                </li>
                <li
                    className="margin5-bottom">
                    <span> Count: </span>
                    <Link
                        title={`View all Transactions by ${transaction.username}`}
                        to={`${match.url}/${transaction.username}`} className="text-link-with-hover">{transaction.count}</Link>

                </li>

            </ul>
            <i
                title={`View all Transactions by ${transaction.username}`}
                onClick={() => { history.push(`${match.url}/${transaction.username}`) }}

                className="fa fa-angle-right font40 text-green padd20 pointer"></i>

        </li>
    )
})
export const TransactionDeskTop = ({ transaction }) => {
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
                        to={`/u/${transaction.username}`}
                        className="text-link-with-hover">
                        {transaction.username}
                    </Link>
                </li>

                <li
                >
                    {transaction.email}
                </li>
                <li
                >
                    {transaction.count}
                </li>
                <li>
                    <button className="padd5 border5-radius bg-dark-blue border-dark-blue text-white no-outline">Delete</button>
                </li>
            </ul>


        </li>
    )
}
