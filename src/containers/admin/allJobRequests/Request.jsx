import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { getDate } from '../../../helperFunctions/getDate'
import { domain } from '../../../helperFunctions/domain'
import axios from 'axios'
import Modal from '../../../components/Modal'


export const RequestMobile = ({ request, deleteItem }) => {
    const [request_, setRequest] = useState(request)
    const [showAction, setShowAction] = useState(false)
    const [editModalIsOpen, setEditModalIsOpen] = useState(false)
    let state;
    if (request_.declined)
        state = "Declined/Draft"
    else if (request_.approved)
        state = "Published"
    else
        state = "Pending"

    const handleAction = (state) => {


        async function fetchData() {
            const action = {}
            action[state] = true
            const url = `${domain}/api/requests/${request_._id}`
            const response = await axios.put(url, action)
            console.log(response.data)
            setRequest(response.data)

        }
        fetchData()



    }

    const handleEdit = () => {

    }
    const handleDelete = () => {
        console.log("here")
        async function fetchData() {
            const action = {}
            action[state] = true
            const url = `${domain}/api/requests/${request_._id}`
            const response = await axios.delete(url)
            console.log(response.data)
            deleteItem(response.data)


        }
        fetchData()

    }
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
            color: "rgba(0,0,0,0.3)"
        }
    }


    return (
        <>{
            editModalIsOpen && <Modal
                title="Delete Request" handleCloseModal={() => setEditModalIsOpen(false)}

            >
                <div className="padd10">
                    <div className="center-text font16 margin20-bottom">
                        Sure to delete the request?
                </div>
                    <div className="flex-between ">
                        <button
                            onClick={handleDelete}
                            className="padd20 padd5-top-bottom border5-radius">
                            Yes
    </button>
                        <button
                            onClick={() => setEditModalIsOpen(false)}
                            className="padd20 padd5-top-bottom border5-radius">
                            No
    </button>
                    </div>
                </div>
            </Modal>
        }

            <li
                className="border-smooth font14 padd10 margin5-bottom bg-white">
                <ul

                    onMouseEnter={() => setShowAction(true)} onMouseLeave={() => setShowAction(false)}>
                    <li
                        className="margin5-bottom relative">
                        <span>  </span>
                        <Link
                            to={`/u/${request_.username}`} className="text-link-with-hover"> {request.username}
                        </Link>
                        {showAction &&
                            <span style={style.actionButton} className=" block border5-radius padd10 padd5-top-bottom">
                                <i
                                    onClick={handleDelete}
                                    title="Delete request"
                                    className="fa fa-pencil font14 pointer hover-text-black margin5-right "
                                    style={style.actionItem}
                                >

                                </i>
                                <i
                                    onClick={() => setEditModalIsOpen(true)}
                                    title="Edit request"
                                    className="fa fa-trash font14 pointer margin5-right hover-text-black"
                                    style={style.actionItem}
                                >

                                </i>


                            </span>
                        }


                    </li>
                    <li
                        className="margin5-bottom">
                        <span> Title: </span>
                        {request_.title}
                    </li>
                    <li
                        className="margin5-bottom">
                        <span> Category: </span>
                        {request_.category}
                    </li>
                    <li
                        className="margin5-bottom">
                        <span> Date: </span>
                        {getDate(request_.createdAt)}
                    </li>
                    <li
                        className="margin10-bottom">
                        <span> State: </span>
                        {state}
                    </li>
                    {
                        (!request_.approved && !request_.declined) &&
                        <li className="flex-between">
                            <button
                                onClick={() => handleAction("approved")}
                                className="padd15 padd5-top-bottom border5-radius bg-dark-blue border-dark-blue text-white no-outline">Approve
                    </button>
                            <button
                                onClick={() => handleAction("declined")}
                                className="padd15 padd5-top-bottom border5-radius no-outline">Decline
                    </button>
                        </li>

                    }

                </ul>


            </li>
        </>
    )
}
export const RequestDesktop = ({ request }) => {
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
                        to={`/u/${request.requestname}`}
                        className="text-link-with-hover">
                        {request.requestname}
                    </Link>
                </li>
                <li>
                    {getDate(request.createdAt)}
                </li>
                <li
                >
                    {request.phone}

                </li>
                <li
                >
                    {request.email}
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
