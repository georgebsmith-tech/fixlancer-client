import React from 'react';
import { getDate } from '../../../helperFunctions/getDate'
import { Link } from 'react-router-dom'


export const AffiliateMobile = ({ affiliate }) => {
    return (
        <li>
            <ul className="bg-white border-smooth padd10 font16">
                <li
                    className="margin5-bottom relative">

                    <Link
                        to={`/u/${affiliate.username}`} className="text-link-with-hover bold"> Smith
                    </Link>
                </li>
                <li
                    className="margin5-bottom">
                    <span> Visits: </span>
                    {getDate(affiliate.createdAt)}
                </li>
                <li
                    className="margin5-bottom">
                    <span> Orders: </span>
                    {affiliate.phone}
                </li>
                <li
                    className="margin5-bottom">
                    <span> Referrals: </span>
                    {affiliate.email}
                </li>
                <li
                    className="margin5-bottom">
                    <span> Earnings: </span>
                    {affiliate.email}
                </li>
                <li
                    className="margin5-bottom">
                    <span> Date Applied: </span>
                    {affiliate.email}
                </li>
                <li
                    className="margin5-bottom">
                    <span> Website: </span>
                    {affiliate.email}
                </li>
                <li
                    className="margin5-bottom">
                    <span> Status: </span>
                    {affiliate.email}
                </li>
                <li>

                    <button className="padd10 padd5-top-bottom text-white bold bg-orange font16 border5-radius bd-orange no-outline">
                        Deactivate
                </button>

                </li>
            </ul>
        </li>
    );
}


