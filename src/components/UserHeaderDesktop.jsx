import React, { useState } from 'react';
import { Link, withRouter } from 'react-router-dom'

const UserHeaderDesktop = ({ history, location }) => {
    console.log(location)
    const [showRequests, setShowRequests] = useState(false)
    const [searchTerm, setSearchTerm] = useState("")
    const [searchError, setSearchError] = useState(false)
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


    return (
        <section className="desktop">
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
                        <li>
                            <Link to="#"
                                className="drop-down-requests font15"
                                onClick={toggleRequest}>Job Request <i className="fa fa-caret-down"></i></Link>
                            {
                                showRequests && <ul className="drop-down-container drop-requests">
                                    <li><a href="/dashboard/post-job-request" className="drop">Post a Request</a></li>
                                    <li><a href="/dashboard/my-requests" className="drop">My Requests</a></li>
                                    {/* {this.state.user.seller &&
                                    <li><a href="/dashboard/job-requests" className="drop">All Requests</a></li>

                                } */}

                                </ul>
                            }
                        </li>
                        <li>
                            <Link
                                to="/dashboard/my-sales"
                                className="font15 padd15">Sales (4)<span className="header-ongoing-sales"></span></Link>
                        </li>
                        <li>
                            <Link
                                to="/dashboard/my-orders"
                                className="font15 padd15"
                            >Orders (4)<span className="header-ongoing-sales"></span></Link>
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
                    <li className="padd20 flex align-center">
                        <span
                            style={{ width: 30, height: 30 }}
                            className="bold text-white bg-green font16 flex justify-center align-center circle margin5-right">
                            {"b".toUpperCase()}
                        </span>
                        <i className="fa fa-angle-down font16 bold pointer"></i>
                    </li>
                    <li
                        className="margin20 bd-orange circle padd10 padd5-top-bottom pointer">

                        <span className="font14 text-orange">₦{(28.4).toFixed(3)}</span>

                    </li>

                </ul>

            </header>
        </section>
    );
}

export default withRouter(UserHeaderDesktop);
