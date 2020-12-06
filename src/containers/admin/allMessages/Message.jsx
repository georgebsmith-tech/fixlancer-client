import React from 'react'
import { Link } from 'react-router-dom'
import { getDate } from '../../../helperFunctions/getDate'
const Message = ({ message, userColors }) => {
    const loggedUser = localStorage.getItem("username")

    const initial = message.from === loggedUser ? message.to : message.from
    const lastMessageby = message.from === loggedUser ? "Me" : message.from
    return (

        <li
            className="font15">
            <Link
                to={`/dashboard/inbox?with=${message.to}`}
                className="block inbox-summary border-bottom">
                <div
                    className="grid">
                    <span
                        className="user-avatar"
                        style={{ backgroundColor: userColors[message.from] }}>{initial[0].toUpperCase()}
                    </span>
                    <div>
                        <span
                            className="bold block desktop">
                            {lastMessageby}:
                                         </span>
                        <span class="who bold margin3-right">{lastMessageby}:</span>
                        <span>{message.message}</span>

                    </div>


                </div>
                <div className="flex-end font12">{getDate(message.createdAt)}</div>




            </Link>

        </li>
    )
}
export default Message;