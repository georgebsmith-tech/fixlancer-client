import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import CategoriesList from '../components/CategoriesList'
import HorinzontalScroll from '../components/helperComponents/HorinzontalScroll'
import FeaturedFixesList from '../components/fixes/FeaturedFixesList'
import RecommendationList from '../components/fixes/RecommendationList'
import { HomeFooter } from '../components/HomeFooter'
import { HomeExtra } from '../components/HomeExtra'
import { HomeMainExtra } from '../components/HomeMainExtra'
import Heading from '../components/helperComponents/SubHeading'
import axios from 'axios'
import { domain } from '../helperFunctions/domain'
import { Loading } from '../components/helperComponents/Loading'

class Home extends Component {
    state = {
        search: "",
        featuredFixes: [],
        recommendedFixes: [],
        isLoading: true

    }

    handleChange = (e) => {
        this.setState({ search: e.target.value.trim() })
        console.log(e.target.value.trim())
    }

    handleSubmit = () => {

        if (!this.state.search) {
            console.log("error")
            this.setState({ searchError: true })
            return

        }

        this.props.history.push(`/search-fix?term=${this.state.search}&pg=1`)
    }
    componentDidMount = async () => {
        const recom_url = `${domain}/api/fixes?state=random&count=10`
        const recom_response = await axios.get(recom_url)
        const featured_url = `${domain}/api/fixes?state=featured&count=10`
        const featured_response = await axios.get(featured_url)
        this.setState({ recommendedFixes: recom_response.data, featuredFixes: featured_response.data, isLoading: false })
    }

    render() {
        return (
            <>
                <header
                    className="bg-white" style={{ backgroundColor: "#fefefe" }}>
                    <div
                        className="flex-between padd60-sides-desktop">
                        <div
                            className="margin10-top padd10">
                            <Link
                                to="/"
                                style={
                                    {
                                        width: 120
                                    }
                                }
                                className="block">
                                <img
                                    src="./images/logo.png" alt=""
                                />
                            </Link>

                        </div>
                        <div
                            className="margin10-top padd10 margin10-right mobile">
                            <ul
                                className="font12 flex">
                                <li>
                                    <Link
                                        to="/login" className="font14 margin10-right link-hover-underline bold">
                                        Login
                                    </Link>|
                                </li>
                                <li>
                                    <Link
                                        to="/register"
                                        className="font14 margin10-right margin10-sides link-hover-underline bold">
                                        Register
                                    </Link>
                                </li>

                            </ul>
                        </div>
                        <div
                            className="margin10-top padd10 margin10-right desktop">
                            <ul
                                className="font12 flex">
                                <li>
                                    <Link
                                        to="/login"
                                        className="font14 margin10-right link-hover-underline bold">
                                        Login
                                    </Link>|
                                </li>
                                <li>
                                    <Link
                                        to="/register"
                                        className="font14 margin10-right margin10-sides link-hover-underline bold">
                                        Register
                                    </Link>|
                                </li>
                                <li>
                                    <Link
                                        to="" className="font14 margin10-sides link-hover-underline bold">
                                        Invite Friends
                                    </Link>
                                </li>
                            </ul>
                        </div>
                    </div>
                    <div className="margin40-top"></div>
                    <div
                        className="flex-between-desktop padd-desktop-sides index-CTA">


                        <div
                            className="desktop">
                            <img
                                src="../../images/index.png"
                                alt=""
                                style={
                                    {
                                        width: 550
                                    }
                                }
                            />
                        </div>
                        <div
                            className="width40per">
                            <div
                                className="font29 center-text mobile">
                                <div
                                    className="padd10"
                                    style={{ marginBottom: -7 }}>
                                    <span>Find </span>
                                    <span
                                        className="bold text-orange">
                                        Services
                                    </span>

                                </div>
                                <div>
                                    for your business
                                </div>

                            </div>

                            <div
                                className="font40 desktop">
                                <div
                                    className="padd10" style={{ marginBottom: -7 }}>
                                    <span>Find</span>
                                    <span className="bold text-orange">Services</span>

                                </div>
                                <div>
                                    for your business
                                </div>

                            </div>
                            <div
                                className="padd30 center-text serch-top-desktop">
                                <div>
                                    <input type="text"
                                        className="block padd10 bg-white search-input"
                                        style={{
                                            width: "100%", outline: "none", borderRadius: 4, border: "1px solid #ddd", boxShadow: "3px -3px 6px  #ddd inset"
                                        }}
                                        placeholder="Try 'logo'"
                                        onChange={this.handleChange}
                                    />
                                </div>
                                <div
                                    className="text-red font14 hide error">
                                    <i
                                        className="fa fa-exclamation-circle text-red">

                                    </i>
                                    The search filed can not be empty
                                </div>
                                <div>
                                    <button className="block button-search-index full-width margin5-top search-button"
                                        onClick={this.handleSubmit}>
                                        <i
                                            className="fa fa-search text-white font15">

                                        </i>
                                        Search
                                    </button>

                                </div>
                            </div>
                            <div
                                className="padd20 secured-index">
                                <div className="grid2-1-6">
                                    <div>
                                        <i
                                            className="fas fa-shield-alt text-success font40 font70-desktop" id="shield">

                                        </i>
                                    </div>
                                    <div
                                        className="margin5-top">
                                        <div
                                            className="bold font18">
                                            100% secured
                                        </div>
                                        <div
                                            className="font14 margin10-top font16-desktop">
                                            Job is done or Money back

                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>


                </header>


                <main
                    className="main"
                    style={{
                        boxShadow: "2rem 0.15rem 5rem 0 rgba(58, 59, 69, 0.15)"
                    }}>
                    <div
                        className="margin10-top cat-pictures">
                        <Link
                            to="/section/writing" className="margin20-right">
                            <img
                                src="./images/cat3.jpg" alt=""

                            />
                        </Link>
                        <Link
                            to="/section/graphics-and-design" className="desktop margin20-right">
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
                    <div
                        className="margin40-top ">
                        <h2
                            className="bold font20 margin20-bottom">
                            Categories
                        </h2>
                        <HorinzontalScroll>
                            <CategoriesList />

                        </HorinzontalScroll>
                    </div>

                    <section
                        className="margin30-top">
                        <Heading
                            heading={"Featured"}

                        />
                        {
                            this.state.isLoading ? <Loading height="260px" message="Loading Featured Fixes" /> :
                                <HorinzontalScroll>
                                    <FeaturedFixesList
                                        fixes={this.state.featuredFixes}
                                    />
                                </HorinzontalScroll>
                        }
                    </section>

                    <section
                        className="margin50-top ">
                        <div
                            className="margin20-bottom">
                            <h2
                                className="bold font20">
                                Recommended for you
                            </h2>

                        </div>
                        {
                            this.state.isLoading ? <Loading height="600px" /> :

                                <RecommendationList
                                    fixes={this.state.recommendedFixes} />
                        }
                    </section>
                    <HomeMainExtra />
                    <HomeExtra />

                </main>
                <HomeFooter />
            </>
        );
    }
}

export default Home;