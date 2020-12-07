import React, { useState, useEffect } from 'react'
import UserHeader from '../../components/UserHeader'
import UserFooter from '../../components/UserFooter'
import { domain } from '../../helperFunctions/domain'
import axios from 'axios'
import FeaturedList from '../../components/fixes/RecommendationList'
import { Link } from 'react-router-dom'
import { Loading } from '../../components/helperComponents/Loading'




const SearchFix = ({ location, history }) => {
    const [aFix, setAFix] = useState({
        username: "Smith",
        title: "i will do it",
        price: 2000,
        delivery_days: 6
    })
    const [fixes, setFixes] = useState([])
    const [categories, setCategories] = useState([])
    const [rawTerm, setRawTerm] = useState()
    const [term, setTerm] = useState(rawTerm)
    const [isLoading, setIsloading] = useState(true)
    const [count, setCount] = useState(0)
    const [page, setPage] = useState(1)
    const [pages, setPages] = useState(1)
    const [showSubs, setShowSubs] = useState(false)
    const [filterIsOpen, setFilterIsOpen] = useState(false)

    const q_strings = location.search.substr(1)
    // console.log(q_strings)
    useEffect(() => {

        async function fetchData() {
            setIsloading(true)
            const url = `${domain}/api/fixes?state=search&limit=4&${q_strings}`
            const response = await axios.get(url)
            console.log(response.data)
            setCount(response.data.count)
            setFixes(response.data.data)
            setRawTerm(response.data.q)
            setTerm(response.data.q)
            setPages(response.data.pages)
            setPage(response.data.page)
            const category_url = `${domain}/api/categories`
            const categories_response = await axios.get(category_url)
            console.log(categories_response.data)
            setCategories(categories_response.data.data)
            // setOrders(response.data.orders)
            // setOrderCounts(response.data.orderCounts)
            setIsloading(false)
        }
        fetchData()

    }, [])
    useEffect(() => {
        console.log("again")
        setIsloading(true)
        async function fetchData() {
            const url = `${domain}/api/fixes?state=search&limit=4&${q_strings}`
            const response = await axios.get(url)
            console.log(response.data)
            setCount(response.data.count)
            setFixes(response.data.data)
            setRawTerm(response.data.q)
            setTerm(response.data.q)
            setPages(response.data.pages)
            setPage(response.data.page)
            const category_url = `${domain}/api/categories`
            const categories_response = await axios.get(category_url)
            console.log(categories_response.data)
            setCategories(categories_response.data.data)
            // setOrders(response.data.orders)
            // setOrderCounts(response.data.orderCounts)
            setIsloading(false)
        }
        fetchData()

    }, [location.search])

    const handleChange = (e) => {

        setTerm(e.target.value)
        console.log(e.target.value)

    }
    const subMitSearch = () => {
        history.push("/search-fix?term=" + term + "&pg=1")

    }
    const handlePrev = () => {
        setPage(page - 1)
        history.push("/search-fix?term=" + term + "&pg=" + (page - 1))
    }
    const handleNext = () => {
        setPage(page + 1)
        history.push("/search-fix?term=" + term + "&pg=" + (page + 1))

    }
    const start = 4 * page - 3
    const end = 4 * page + fixes.length - 4

    return (
        <>
            <UserHeader />
            {
                isLoading ? <Loading /> :

                    <main className="main" style={{ minHeight: "69vh" }}>
                        {
                            filterIsOpen &&

                            <section
                                className="margin20-top">
                                <div
                                    className="flex flex-wrap fix-categories-container">
                                    {
                                        categories.map(category =>
                                            <div
                                                className="fix-categories circle font13">
                                                <div
                                                    onClick={(e) => { setShowSubs(!showSubs) }}
                                                >
                                                    <span>{category.name}</span>

                                                    <i
                                                        className="fa fa-caret-down margin5-right">

                                                    </i>
                                                </div>
                                                {
                                                    showSubs && <div
                                                        className="options border-smooth">

                                                        <div
                                                            className="margin10-bottom">
                                                            <Link
                                                                to={
                                                                    `/section/${category.catSlug}`
                                                                }>
                                                                (View all)
                                                            </Link>
                                                        </div>
                                                        {
                                                            category.subcat.map(subcat =>

                                                                <div
                                                                    className="option">
                                                                    {subcat.name}
                                                                </div>)
                                                        }
                                                        <div
                                                            className="margin10-bottom">
                                                            <a href="">Others</a>
                                                        </div>
                                                    </div>

                                                }


                                            </div>)
                                    }

                                </div>

                            </section>
                        }



                        {fixes.length !== 0 && <div
                            className="font14 alt-show">
                            Showing {start === end ? start : `${start}-${end}`} of {count} results for " <span class="bold alt-show-term">{rawTerm} </span>"
            </div>}
                        <div class="search-by-cat-container">
                            <input
                                typeName="text"
                                className="border-smooth search-by-cat"
                                value={term}
                                onChange={handleChange} />
                            <i className="fa fa-search font16 search-btn-body"
                                onClick={subMitSearch}></i>
                        </div>
                        {fixes.length !== 0 &&
                            <div class="flex-center margin10-top margin20-bottom">
                                <button
                                    onClick={() => setFilterIsOpen(!filterIsOpen)}
                                    className="block center-text border-smooth filterBtn bg-white">
                                    <i
                                        className="fa fa-filter font15 text-orange" aria-hidden="true"></i>
                                    <span class="font15">Filter search Result</span>

                                </button>
                            </div>
                        }
                        {fixes.length === 0 &&
                            <div class="no-results">


                                <div class="center-text font13 flex-center bold" style={{ flexDirection: "row", marginTop: 40 }}>
                                    <div>
                                        <img src="https://www.fixlancer.com/wp-content/themes/fixFIX/images/search_icn.png" alt=""
                                            style={{ width: 22, marginBottom: -8, display: "inline" }} />
                Sorry we could not find any results, try a different search.
            </div>
                                </div>
                                <div class="font16 center-text margin10-top">
                                    <div>
                                        Or
                    </div>
                                    <div class="margin10-top">
                                        <div class="margin5-top">
                                            <a href="/dashboard/post-job-request"
                                                class="button block font16 bg-green text-white border-green">Post
                                Job Request</a>
                                        </div>
                                    </div>

                                </div>
                            </div>

                        }

                        <FeaturedList fixes={fixes} />
                        {pages > 1 && <div
                            className="search-pagination">

                            <div
                                className="font16 page-nav-holder flex-center"
                                style={{ flexDirection: "row" }}>
                                <i
                                    onClick={handlePrev}
                                    className={"fa fa-caret-left previous-result pointer " + (page === 1 && "invisible")}>

                                </i>


                                <span

                                    className="current-page" >
                                    Page {page}
                                </span>

                                <i
                                    onClick={handleNext}
                                    className={`fa fa-caret-right next-result pointer ${pages === page && "invisible"}`} >

                                </i>
                            </div>


                        </div>}


                    </main>
            }
            <UserFooter />
        </>
    )
}

export default SearchFix