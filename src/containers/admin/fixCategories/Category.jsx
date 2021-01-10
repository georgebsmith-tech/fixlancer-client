import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { getDate } from '../../../helperFunctions/getDate'
import Modal from '../../../components/Modal'
import axios from 'axios'
import { domain } from '../../../helperFunctions/domain'

const style = {
    actionButton: {
        position: "absolute",
        right: 0,
        top: 0,
        backgroundColor: "rgba(0,0,0,0.02)"
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



export const CategoryMobile = ({ category, deleteItem }) => {
    const category_ = category
    const [deleteModalIsOpen, setDeleteModalIsOpen] = useState(false)
    const [showAction, setShowAction] = useState(false)
    const handleDelete = () => {

        async function fetchData() {

            const url = `${domain}/api/categories/${category_._id}`
            const response = await axios.delete(url)
            console.log(response.data)
            deleteItem(response.data)


        }
        fetchData()

    }

    return (
        <>
            {
                deleteModalIsOpen && <Modal
                    title="Delete Request" handleCloseModal={() => setDeleteModalIsOpen(false)}

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
                                onClick={() => setDeleteModalIsOpen(false)}
                                className="padd20 padd5-top-bottom border5-radius">
                                No
    </button>
                        </div>
                    </div>
                </Modal>
            }
            <li
                className="border-smooth font14 padd10 margin5-bottom bg-white">
                <ul onMouseEnter={() => setShowAction(true)} onMouseLeave={() => setShowAction(false)} >
                    <li
                        className="margin5-bottom relative">
                        <span> Category: </span>
                        <Link
                            to={`/admin/${category.catSlug}`} className="text-link-with-hover"> {category.name}
                        </Link>
                        {
                            showAction &&
                            <span style={style.actionButton} className=" block border5-radius padd10">
                                <i
                                    onClick={() => setDeleteModalIsOpen(true)}
                                    title="Delete request"
                                    className="fa fa-trash font14 pointer hover-text-black"
                                    style={style.actionItem}
                                >

                                </i>

                            </span>

                        }

                    </li>

                    <li
                        className="margin5-bottom">
                        <span>Slug: </span>
                        {category.catSlug}
                    </li>
                    <li
                        className="margin5-bottom">
                        <span> No. of subcategories: </span>
                        {category.subcat.length}
                    </li>
                    <li
                        className="margin5-bottom">
                        <span> No. of fix: </span>
                        {category.fixCounts || 0}
                    </li>
                    <li
                        className="margin5-bottom">
                        <span> Created on: </span>
                        {getDate(category.date)}
                    </li>
                </ul>


            </li>
        </>
    )
}
export const CategoryDesktop = ({ category }) => {
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
                        to={`/u/${category.catSlug}`}
                        className="text-link-with-hover">
                        {category.name}
                    </Link>
                </li>
                <li>
                    {category.catSlug}
                </li>
                <li>

                    {category.subcat.length}
                </li>
                <li>

                    {category.fixCounts || 0}
                </li>

                <li>
                    {getDate(category.date)}
                </li>

            </ul>


        </li>
    )
}
