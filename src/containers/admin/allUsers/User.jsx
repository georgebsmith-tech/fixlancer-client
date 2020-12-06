import React from 'react'
import { Link } from 'react-router-dom'
import { getDate } from '../../../helperFunctions/getDate'

export const UserMobile = ({ user }) => {
    return (
        <li
            className="border-smooth font14 padd10 margin5-bottom bg-white">
            <ul>
                <li
                    className="margin5-bottom">
                    <span>  </span>
                    <Link
                        to={`/u/${user.username}`} className="text-link-with-hover"> {user.username}
                    </Link>
                </li>
                <li
                    className="margin5-bottom">
                    <span> Registered: </span>
                    {getDate(user.createdAt)}
                </li>
                <li
                    className="margin5-bottom">
                    <span> Mobile no: </span>
                    {user.phone}
                </li>
                <li
                    className="margin5-bottom">
                    <span> Email: </span>
                    {user.email}
                </li>
                <li
                    className="margin10-bottom">
                    <span> Last Seen: </span>
                     3h
                </li>
                <li>
                    <button
                        className="padd5 border5-radius bg-dark-blue border-dark-blue text-white no-outline">Delete
                    </button>
                </li>
            </ul>


        </li>
    )
}
export const UserDesktop = ({ user }) => {
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
                        to={`/u/${user.username}`}
                        className="text-link-with-hover">
                        {user.username}
                    </Link>
                </li>
                <li>
                    {getDate(user.createdAt)}
                </li>
                <li
                >
                    {user.phone}

                </li>
                <li
                >
                    {user.email}
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
