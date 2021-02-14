import React, { useState, useEffect } from 'react';
import { Link, withRouter } from 'react-router-dom'
import axios from 'axios'
import { domain } from '../helperFunctions/domain'

const UserHeaderDesktop = ({ history, location }) => {
    const username = localStorage.getItem("username")
    const config = {
        headers: {
            Authorization: `Bearer ${localStorage.getItem("auth-token")}`
        }
    }
    const [showRequests, setShowRequests] = useState(false)
    const [user, setUser] = useState({})
    const [searchTerm, setSearchTerm] = useState("")
    const [searchError, setSearchError] = useState(false)
    const [showFinanceDropDown, setShowFinanceDropDown] = useState(false)
    const [showUserDropDown, setShowUserDropDown] = useState(false)
    async function fetchData(url) {

        // const url = `${domain}/api/fixes?state=search&limit=4&${q_strings}`
        const response = await axios.get(url, config)
        return response.data

    }


    useEffect(() => {
        (async function () {
            const userData = await fetchData(`${domain}/api/users/${username}`)
            console.log(userData)
            setUser(userData.data)

        })()

    }, [])



    const toggleRequest = () => {
        setShowRequests(!showRequests)

    }
    const search = () => {
        setSearchError(false)
        if (!searchTerm) {
            setSearchError(true)
            return

        }
        history.push(`/search-fix?term=${searchTerm}&pg=1`)
        setSearchTerm("")
    }
    const handleSearch = (e) => {

        setSearchTerm(e.target.value)
        if (e.keyCode === 13) {
            search()

        }




    }

    const handleDropFinance = () => {
        setShowFinanceDropDown(!showFinanceDropDown)
    }
    const handleDropDownUser = () => {
        setShowUserDropDown(!showUserDropDown)
    }

    const handlelogOut = (e) => {
        e.preventDefault()
        localStorage.clear()
        history.push("/")
    }


    return (
        <section className="desktop bg-white">
            <header
                style={{
                    boxShadow: "0 0.15rem 1.75rem 0 rgba(58, 59, 69, 0.15)",
                    position: "relative", zIndex: 10
                }}
                className="bg-white flex-between padd10">
                <nav>
                    <ul className="flex align-center">
                        <li>
                            <Link to="/dashboard" >
                                <img
                                    src="../../images/logo.png" alt=""
                                    style={{ width: 130 }}
                                />
                            </Link>
                        </li>
                        <li>
                            <Link to="/dashboard" className="font16 padd15">
                                Home
                        </Link>
                        </li>
                        <li className="relative">
                            <Link to="#"
                                className="drop-down-requests font15"
                                onClick={toggleRequest}>Job Request <i className="fa fa-caret-down"></i></Link>
                            {
                                showRequests && <ul className="border-smooth bg-white padd20 font13"
                                    style={{ position: "absolute" }}>
                                    <li className="margin10-bottom"><Link to="/dashboard/post-job-request" className="no-break">Post a Request</Link></li>
                                    <li className="margin10-bottom"><Link to="/dashboard/my-requests" className="drop">My Requests</Link></li>
                                    {user.seller &&
                                        <li className="margin10-bottom"><Link to="/dashboard/job-requests" className="drop">All Requests</Link></li>

                                    }

                                </ul>
                            }
                        </li>
                        <li>
                            <Link
                                to="/dashboard/my-sales"
                                className="font15 padd15">Sales ({user.summary && user.summary[2][1]})<span className="header-ongoing-sales"></span></Link>
                        </li>
                        <li>
                            <Link
                                to="/dashboard/my-orders"
                                className="font15 padd15"
                            >Orders ({user.summary && user.summary[3][1]})<span className="header-ongoing-sales"></span></Link>
                        </li>
                        <li>
                            <Link
                                to="/dashboard/create-a-fix"
                                className="font15 padd15"
                            >Start Selling </Link>
                        </li>
                        <li>
                            <Link
                                to="/dashboard/affiliate"
                                className="font15 padd15"
                            >Affiliate </Link>
                        </li>
                        <li className="relative padd15">
                            <input
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                onKeyDown={handleSearch}
                                placeholder="Find services e.g logo"
                                type="text"
                                style={{ width: 350 }}
                                className="padd10 padd5-top-bottom border-smooth font15 block" />
                            {
                                searchError && <div
                                    className="font12 absolute"
                                    style={{ bottom: 0 }}>
                                    <i
                                        className="fa fa-exclamation text-red margin3-right"></i>
                                    <span
                                        className="text-red">search field can not be empty</span>

                                </div>
                            }
                            <i
                                className="fa fa-search absolute font14 padd10 pointer"
                                style={{ right: 15, top: 12 }}
                                onClick={search}>

                            </i>
                        </li>


                    </ul>

                </nav>
                <ul className="flex align-center">
                    <li className="padd20">
                        <Link to="/dashboard/inbox">


                            <i className="fa fa-envelope font18"></i>
                        </Link>
                    </li>
                    <li className="padd20">
                        <Link to="/dashboard/finance/notices">


                            <i className="fa fa-bell font18"></i>
                        </Link>
                    </li>
                    <li
                        onClick={handleDropDownUser}
                        className="margin20-right margin20-left flex align-center relative pointer">
                        <span
                            style={{ width: 30, height: 30 }}
                            className="bold text-white bg-green font16 flex justify-center align-center circle margin5-right">
                            {user.username ? user.username[0].toUpperCase() : ""}
                        </span>
                        <i className="fa fa-angle-down font16 bold pointer"></i>
                        {
                            showUserDropDown &&

                            <ul
                                style={{ position: "absolute", right: -10, top: 70 }}
                                className="border-smooth bg-white padd20 font13">
                                <li className="margin10-bottom"><Link to={`/u/${user.username}`} className="no-break">View Profile</Link></li>
                                <li className="margin10-bottom"><Link to="/dashboard/edit" className="drop no-break margin10-bottom">Edit Profile</Link></li>

                                <li><Link to="#" onClick={handlelogOut}>Log Out</Link></li>


                            </ul>

                        }
                    </li>
                    <li
                        onClick={handleDropFinance}
                        className="margin20 bd-orange circle padd10 padd5-top-bottom pointer relative">

                        <span className="font14 text-orange margin5-right">₦{user.summary && user.summary[1][1].toFixed(2)}</span>
                        <i className="fa fa-angle-down font16 bold text-orange"></i>
                        {
                            showFinanceDropDown &&

                            <ul
                                style={{ position: "absolute", right: 22, top: 60 }}
                                className="border-smooth bg-white padd20 font13">
                                <li className="margin10-bottom"><Link to="/dashboard/finance" className="">Finance</Link></li>
                                <li className="margin10-bottom"><Link to="/dashboard/finance/withdraw" className="drop no-break margin10-bottom">Request Withdrawal</Link></li>

                                <li className="margin10-bottom"><Link to="/dashboard/job-requests" className="drop">Deposit Funds</Link></li>

                                <li className="margin10-bottom"><Link to="/dashboard/job-requests" className="no-break" >Buy chopbarh Voucher</Link></li>
                            </ul>

                        }
                    </li>

                </ul>

            </header>
        </section>
    );
}

export default withRouter(UserHeaderDesktop);
