import React, { Component } from 'react'
import UserHeader from '../../components/UserHeader'
import { Link } from 'react-router-dom'
import CategoriesList from '../../components/CategoriesList'
import HorinzontalScroll from '../../components/helperComponents/HorinzontalScroll'

import UserFooter from '../../components/UserFooter'

import Heading from '../../components/helperComponents/SubHeading'

import FeaturedList from '../../components/fixes/RecommendationList'

import MyFixes from '../../components/fixes/FeaturedFixesList'
import DashBoardProfile from './DashBoardProfile'
import axios from 'axios'
import { domain } from '../../helperFunctions/domain'
import { Loading } from '../../components/helperComponents/Loading'
import { FaSortAmountUp } from 'react-icons/fa'
import { Route } from "react-router-dom"
import MyRequests from '../requests/MyRequests'



class Dahsboard extends Component {
    constructor(props) {
        super(props)
        console.log(this.props)
        this.state = {
            user: "",
            fixes: [],
            userFixes: [],
            isLoading: true,
            username: localStorage.getItem("username")
        }

    }


    componentDidMount = async () => {
        const url = `${domain}/api/users/${this.state.username}`
        const response = await axios.get(url)
        console.log(response.data.data)
        //  this.setState({user:response.data.data})
        const recom_url = `${domain}/api/fixes?state=random&count=10`
        const recom_response = await axios.get(recom_url)
        const url_of_user_fix = `${domain}/api/fixes/${localStorage.getItem("username")}`
        const response2 = await axios.get(url_of_user_fix)
        console.log(response2.data.data)
        // setFixes()
        console.log(recom_response.data.data)
        this.setState({ user: response.data.data, fixes: recom_response.data, userFixes: response2.data.data, isLoading: false })

    }
    render() {
        //    console.log(this.props)
        return (

            <>
                <UserHeader />
                <Link to={"/dashboard/my-requests"}>
                    This is it

                </Link>
                {
                    this.state.isLoading ? <Loading
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
                                            {this.state.user ? this.state.user.summary[0][1] : 0}
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
                                            {this.state.user ? this.state.user.summary[2][1] : 0}
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
                                            {this.state.user ? this.state.user.summary[3][1] : 0}
                                        </div>
                                    </Link>


                                </div>


                            </div>
                            <div className="margin50-top">
                                <Heading heading={"Featured"} />
                                <FeaturedList
                                    fixes={this.state.fixes}

                                />
                            </div>

                            <div
                                className="margin50-top">

                                <Heading
                                    heading={"My Fix"}

                                />
                                <HorinzontalScroll>
                                    <MyFixes
                                        fixes={this.state.userFixes}

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




                            <DashBoardProfile user={this.state.user} />
                        </main>
                }
                <UserFooter />

                <Route path="/dashboard/my-requests" component={MyRequests} />
            </>
        );
    }
}
export default Dahsboard;