import React from 'react'
import { Link } from 'react-router-dom'
import { getDate } from '../../../helperFunctions/getDate'

export const CategoryMobile = ({ category }) => {
    return (
        <li
            className="border-smooth font14 padd10 margin5-bottom bg-white">
            <ul>
                <li
                    className="margin5-bottom">
                    <span> Category: </span>
                    <Link
                        to={`/admin/${category.catSlug}`} className="text-link-with-hover"> {category.name}
                    </Link>
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
                    {category.fixCounts}
                </li>
                <li
                    className="margin5-bottom">
                    <span> Created on: </span>
                    {getDate(category.date)}
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

                    {category.fixCounts}
                </li>

                <li>
                    {getDate(category.date)}
                </li>
                <li>
                    <button className="padd5 border5-radius bg-dark-blue border-dark-blue text-white no-outline">Delete</button>
                </li>
            </ul>


        </li>
    )
}
