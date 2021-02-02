import React, { useContext, useEffect } from 'react'
import UserHeader from '../../components/UserHeader'
import { Link } from 'react-router-dom'
import CategoriesList from '../../components/CategoriesList'
import HorinzontalScroll from '../../components/helperComponents/HorinzontalScroll'

import UserFooter from '../../components/UserFooter'

import Heading from '../../components/helperComponents/SubHeading'

import FixListMax6 from '../../components/fixes/FixListMax6'

import MyFixes from '../../components/fixes/FeaturedFixesList'
import DashBoardProfile from './DashBoardProfile'
import axios from 'axios'
import { domain } from '../../helperFunctions/domain'
import { Loading } from '../../components/helperComponents/Loading'
import { FaSortAmountUp } from 'react-icons/fa'
import { Route } from "react-router-dom"
import MyRequests from '../requests/MyRequests'
import { DataLayerContext } from '../../context/DataLayer'
import UserHeaderDesktop from '../../components/UserHeaderDesktop'




const Dahsboard = () => {
    const config = {
        headers: {
            Authorization: `Bearer ${localStorage.getItem("auth-token")}`
        }
    }


    const [state, dispatch] = useContext(DataLayerContext);
    useEffect(() => {
        const fetchData = async () => {
            const url = `${domain}/api/users/${localStorage.getItem("username")}`
            const response = await axios.get(url, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("auth-token")}`
                }
            })
            dispatch({
                type: "LOGIN_USER",
                isLoggedIn: true
            })
            dispatch({
                type: "SAVE_LOGGED_USER_SUMMARY",
                userSummary: response.data.data
            })

            const recom_url = `${domain}/api/fixes?state=random&count=10`
            const recom_response = await axios.get(recom_url)
            const url_of_user_fix = `${domain}/api/fixes/${localStorage.getItem("username")}`
            const response2 = await axios.get(url_of_user_fix)

            dispatch({
                type: "SET_USER_FIXES",
                userFixes: response2.data.data
            })
            dispatch({
                type: "SET_FIXES",
                fixes: recom_response.data
            })


            const url_of_user_info = `${domain}/api/users/${localStorage.getItem("username")}?content=full`
            const user_response = await axios.get(url_of_user_info, config)
            window.scrollTo(0, 0)

            dispatch({
                type: "SAVE_LOGGED_USER",
                user: user_response.data.data
            })

            dispatch({
                type: "CHANGE_LOADING",
                isLoading: !state.isLoading
            })
        }
        fetchData()
            .then(data => {
                console.log(state)
            })

        // setState({ user: response.data.data, fixes: recom_response.data, userFixes: response2.data.data, isLoading: false })


    }, [])

    return (


        <>
            <UserHeader />
            <UserHeaderDesktop />

            {
                state.isLoading ? <Loading
                    height="80vh"
                    message="Preparing Dashboard"
                /> :

                    <main
                        className="main">
                        <div
                            className="cat-pictures">
                            <Link
                                to="/section/writing"
                                className="margin20-right">
                                <img
                                    src="./images/cat3.jpg" />
                            </Link>
                            <Link
                                to="/section/graphics-and-design"
                                className="desktop margin20-right">
                                <img
                                    src="./images/cat1.jpg"

                                />
                            </Link>
                            <Link
                                to="/section/programming-and-tech" className="desktop ">
                                <img
                                    src="./images/cat2.jpg"

                                />
                            </Link>
                        </div>
                        <div className="margin30-top">
                            <h2
                                className="bold font20 margin20-bottom">
                                Categories
                               </h2>
                            <HorinzontalScroll>
                                <CategoriesList />

                            </HorinzontalScroll>
                        </div>
                        <div className="grid-desktop2-21">
                            <div className="user-summary">
                                <div
                                    style={{ padding: "0px 20px", height: 100 }}
                                    className="bg-white border-smooth border-left-danger">
                                    <Link to="#" className="flex-between full-height hover-underline">
                                        <div className="font14">
                                            <div className="margin10-bottom">
                                                Unread Messages

                                </div>
                                            <div className="text-danger font20 bolder">
                                                {state.userSummary.summary[0][1]}

                                            </div>
                                        </div>
                                        <div>
                                            <i className="fa fa-comments font40 text-light-grey"></i>

                                        </div>
                                    </Link>
                                </div>
                                <div
                                    style={{ padding: "0px 20px", height: 100 }}
                                    className="bg-white border-smooth">
                                    <Link to="/dashboard/finance" className="flex-between full-height text-link-with-hover">
                                        <div className="font14">
                                            <div className="margin10-bottom">
                                                Balance

                    </div>
                                            <div className="font20 bolder">
                                                ₦{state.userSummary.summary[1][1]}


                                            </div>
                                        </div>
                                        <div>

                                            <i className="fa fa-money  font40 text-light-grey"></i>

                                        </div>
                                    </Link>
                                </div>
                                <div
                                    style={{ padding: "0px 20px", height: 100 }}
                                    className="bg-white border-smooth">
                                    <Link to="/dashboard/my-sales" className="flex-between full-height text-link-with-hover">
                                        <div className="font14">
                                            <div className="margin10-bottom">
                                                Active Sales

                    </div>
                                            <div className="font20 bolder">
                                                {state.userSummary.summary[2][1]}


                                            </div>
                                        </div>
                                        <div>
                                            <i className="fa fa-shopping-cart  font40 text-light-grey"></i>

                                        </div>
                                    </Link>
                                </div>
                                <div
                                    style={{ padding: "0px 20px", height: 100 }}
                                    className="bg-white border-smooth">
                                    <Link to="/dashboard/my-orders" class="flex-between full-height text-link-with-hover">
                                        <div class="font14">
                                            <div class="margin10-bottom">
                                                Active Orders

                    </div>
                                            <div className=" font20 bolder">
                                                {state.userSummary.summary[3][1]}


                                            </div>
                                        </div>
                                        <div>
                                            <i className="fa fa-sort-amount-up  font40 text-light-grey"></i>

                                        </div>
                                    </Link></div>
                            </div>
                            <DashBoardProfile
                                view="desktop-grid"
                                user={state.userSummary} />

                        </div>

                        <div
                            className="margin20-top mobile">
                            <div
                                className="bg-white padd10 circle font15  border">
                                <Link
                                    to="/dashboard/inbox" className="flex-between text-link-with-hover">
                                    <div>

                                        <i
                                            className="fa fa-comments"
                                            style={{ color: "#dddfeb" }}>

                                        </i>
                                        <span> Unread Messages</span>

                                    </div>
                                    <div className="padd5-right">
                                        {(state.userSummary && state.userSummary.summary) ? state.userSummary.summary[0][1] : 0}
                                    </div>
                                </Link>



                            </div>


                            <div className="bg-white padd10 circle font15  margin10-top border">
                                <Link to="/dashboard/my-sales" className="flex-between">
                                    <div>
                                        <i className="fa fa-shopping-cart" aria-hidden="true" style={{ color: "#dddfeb" }}></i>
                                        <span> Ongoing Sales</span>

                                    </div>
                                    <div
                                        className="padd5-right">
                                        {(state.user && state.user.summary) ? state.user.summary[2][1] : 0}
                                    </div>


                                </Link>
                            </div>


                            <div
                                className="bg-white padd10 circle font15  margin10-top border">
                                <Link
                                    to="/dashboard/my-orders" className="flex-between">
                                    <div>
                                        <FaSortAmountUp
                                            style={{ color: "red" }} />
                                        <span> Ongoing Orders</span>

                                    </div>
                                    <div
                                        className="padd5-right">
                                        {(state.userSummary && state.userSummary.summary) ? state.userSummary.summary[3][1] : 0}
                                    </div>
                                </Link>


                            </div>


                        </div>
                        <div className="margin50-top">
                            <Heading heading={"Featured"} />
                            <FixListMax6
                                fixes={state.fixes}

                            />
                        </div>
                        <div
                            className="margin50-top">

                            <Heading
                                heading={"My Fix"}

                            />
                            <HorinzontalScroll>
                                <MyFixes
                                    fixes={state.userFixes}

                                />

                            </HorinzontalScroll>
                        </div>


                        <div className="grid-desktop-2">

                            <div className="bg-white border-smooth margin20-top">
                                <div className="flex-between">
                                    <div className="font16 padd15-left">
                                        Looking to hire?
                                        </div>
                                    <div>
                                        <Link to="/dashboard/post-job-request" className="font16 block padd10 margin5 text-white"
                                            style={{ background: "#f27415", borderRadius: 5 }}>Post a
                                                 Request</Link>
                                    </div>

                                </div>

                            </div>
                            <div className="bg-white border-smooth margin20-top">
                                <div className="flex-between">
                                    <div className="font16 padd15-left">
                                        Looking for work?
                                         </div>
                                    <div>
                                        <Link to="/dashboard/create-a-fix" className="font16 block padd10 margin5 text-white"
                                            style={{ background: "#36b9cc", borderRadius: 5 }}>Start Selling</Link>
                                    </div>

                                </div>

                            </div>
                        </div>




                        <DashBoardProfile
                            view="mobile"
                            user={state.userSummary} />
                    </main>
            }
            <UserFooter />

            <Route path="/dashboard/my-requests" component={MyRequests} />
        </>
    );
}

export default Dahsboard;