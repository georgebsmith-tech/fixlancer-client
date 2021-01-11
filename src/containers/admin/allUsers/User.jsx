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

export const UserMobile = withRouter(({ user, history, updateUsers }) => {
    const [showAction, setShowAction] = useState(false)
    const user_ = user
    const handleBan = () => {
        console.log("Ban")


        async function fetchData() {

            const url = `${domain}/api/users/ban/${user_._id}`
            const response = await axios.put(url, { active: false, online: false })
            console.log(response.data)
            updateUsers(response.data)


        }
        fetchData()

    }

    return (
        <li
            className="border-smooth font14 padd10 margin5-bottom bg-white">
            <ul onMouseEnter={() => setShowAction(true)} onMouseLeave={() => setShowAction(false)}>



                <li
                    className="margin5-bottom relative">
                    {
                        showAction &&

                        <span style={style.actionButton} className=" block border5-radius padd10 padd5-top-bottom">
                            <i
                                // onClick={() => history.push(`/u/${user.username}`)}
                                title="Edit user details"
                                className="fa fa-pencil font14 pointer hover-text-black margin5-right "
                                style={style.actionItem}
                            >

                            </i>
                            <i
                                onClick={handleBan}
                                title="Ban user"
                                className="fa fa-ban font14 pointer margin5-right hover-text-black"
                                style={style.actionItem}
                                aria-hidden="true"></i>
                            <i
                                // onClick={() => setDeleteModalIsOpen(true)}
                                title="Delete user"
                                className="fa fa-trash font14 pointer margin5-right hover-text-black"
                                style={style.actionItem}
                            >

                            </i>



                        </span>
                    }
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
                    {getDate(user.createdAt)}
                </li>

            </ul>


        </li>
    )
})
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
