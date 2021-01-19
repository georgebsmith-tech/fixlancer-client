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

export const TransactionMobile = withRouter(({ transaction, history, updateUsers }) => {
    const [showAction, setShowAction] = useState(false)

    const handleBan = () => {
        console.log("Ban")


        // async function fetchData() {

        //     const url = `${domain}/api/users/ban/${user_._id}`
        //     const response = await axios.put(url, { active: false, online: false })
        //     console.log(response.data)
        //     updateUsers(response.data)


        // }
        // fetchData()

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
                                className="fa fa-pencil font14 pointer hover-text-black margin15-right "
                                style={style.actionItem}
                            >

                            </i>
                            <i
                                onClick={handleBan}
                                title="Ban user"
                                className="fa fa-ban font14 pointer margin15-right hover-text-black"
                                style={style.actionItem}
                                aria-hidden="true"></i>
                            <i
                                // onClick={() => setDeleteModalIsOpen(true)}
                                title="Delete user"
                                className="fa fa-trash font14 pointer hover-text-black"
                                style={style.actionItem}
                            >

                            </i>



                        </span>
                    }
                    <Link
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
                    {transaction.count}
                </li>

            </ul>


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
