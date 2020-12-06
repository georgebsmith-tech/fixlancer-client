import React, { useState, useEffect } from 'react'

import UserHeader from '../../components/UserHeader'
import UserFooter from '../../components/UserFooter'
import { Link } from 'react-router-dom'
import axios from 'axios'
import { domain } from '../../helperFunctions/domain'
import UserFixes from '../../components/fixes/RecommendationList'
import RecommendationsList from '../../components/fixes/FeaturedFixesList'
import HorizontalScroll from '../../components/helperComponents/HorinzontalScroll'

const DetailedFix = ({ match }) => {
    const [titleSlug, setTitleSlug] = useState(match.params.titleSlug)
    const loggedUser = localStorage.getItem("username")
    const [user, setUser] = useState({})
    const [userFixes, setUserFixes] = useState([])
    const [recommendations, setRecommendations] = useState([])
    const [fix, setFix] = useState({
        title: "this is it",
        username: "Smith",
        tags: [],
        images_url: ["https://res.cloudinary.com/dfm1c1iri/image/upload/v1605897187/xt2fezpk2xzrllaxkmof.png", "https://res.cloudinary.com/dfm1c1iri/image/upload/v1605758023/verymhk3qfrqdqb6jjsr.png", "https://res.cloudinary.com/dfm1c1iri/image/upload/v1605758023/verymhk3qfrqdqb6jjsr.png"]
    })

    useEffect(() => {
        async function fetchData() {
            const url = `${domain}/api/fixes/${match.params.subCatSlug}/${match.params.titleSlug}`
            const response1 = await axios.get(url, {
                headers: {
                    Authorization: 'Bearer ' + localStorage.getItem("auth-token")
                }
            })
            const data = response1.data
            console.log(data)
            // setRequest(data.request)
            setFix(data.fix)
            setUser(data.user)
            setUserFixes(data.userFixes)
            setRecommendations(data.recommendations)


        }
        fetchData()

    }, [])
    const handleSlugChange = () => {
        console.log("clicked")
        setTitleSlug(match.params.titleSlug)
    }

    return (
        <>
            <UserHeader />
            <main
                className="main">
                <div
                    className="flex-between chat-send-notice font15 bg-green">
                    <div
                        className="text-white">
                        Your message has been sent
                     </div>
                    <Link
                        to="/dashboard/inbox"
                        className="font15 view-in-btn block link-hover">
                        View in inbox
                    </Link>
                </div>
                <div class="grid-2-21">
                    <section class="about-fix-section">
                        <h1>
                            {fix.title}
                        </h1>
                        <div class="fix-meta">
                            <div>
                                <i class="fas fa-clock"></i>
                                <span>{fix.delivery_days} day(s)</span> <span> delivery</span>
                            </div>
                            <div>
                                <i class="fa fa-star"></i>
                                <span>122</span>

                            </div>
                            <div>
                                <i class="fa fa-eye"></i>
                                <span>{fix.views}</span>
                                <span> Views</span>
                            </div>

                        </div>
                        <div class="corousel-container">
                            <div class="image-carousel-wrapper">
                                {fix.images_url.map((image) =>
                                    <div >
                                        <img
                                            src={`${image}`}
                                            alt={`image for the fix: ${fix.title}`}
                                        />
                                    </div>

                                )}

                            </div>
                            <div class="carousel-nav">
                                {fix.images_url.length !== 1 && <>
                                    <i
                                        className="fa fa-angle-left">

                                    </i>
                                    <i
                                        className="fa fa-angle-right">

                                    </i>
                                </>
                                }
                            </div>

                        </div>
                        {(fix.images_url.length !== 1) &&

                            <div
                                className="carousel-tombnail">
                                {fix.images_url.map((image, id) =>
                                    <div>
                                        <img
                                            src={image}
                                            alt={`image for the fix: ${fix.title}`}
                                        />
                                        <div></div>
                                    </div>
                                )}

                            </div>
                        }
                        <div>
                            <h2>About this Fix</h2>
                            <p>
                                {fix.description}
                            </p>
                        </div>
                        <div className="tags">
                            {fix.tags.map(tag =>
                                <Link to="" className="tag anchor-hover-blue-underline">{tag}</Link>
                            )}
                        </div>
                        <div
                            className="category-and-subcategory">
                            This fix is posted in
                             <Link
                                to="">{fix.subcategory}
                            </Link>,

                            <Link
                                to="">
                                {fix.category}
                            </Link>
                        </div>
                        {(user.username !== loggedUser)
                            &&
                            <div class="flex-center">

                                <div
                                    style={{ width: "100%" }}
                                    className="margin10-top">
                                    <Link
                                        to={`/order-fix/${fix.titleSlug}`}
                                        className="control-btn center-text orange-btn full-width"
                                        onclick="location.href='/order-fix/<%= fix.titleSlug %>'">Order Now ₦{fix.price}
                                    </Link>
                                </div>
                            </div>
                        }
                        <div>
                            <h2
                                className="border-bottom">
                                Ratings
                    </h2>
                            <div style={{
                                fontSize: "1.6rem",
                                padding: "40px 10px 30px 10px"
                            }}>
                                No reviews Yet
                    </div>
                        </div>


                    </section>
                    <section>
                        {(user.username === loggedUser)
                            &&
                            <Link
                                to=""
                                className="control-btn center-text">Edit fix ₦{fix.price}
                            </Link>
                        }
                        <section id="about-seller-section">
                            <h2>About the Seller</h2>
                            <div>
                                <div class="online-status" style={{ padding: "10px 15px 15px 10px" }}>
                                    <div>
                                        <i
                                            className="fa fa-circle user-offline">

                                        </i>

                                        <span
                                            className="user-offline">Offline
                                        </span>
                                    </div>
                                </div>
                                <div
                                    className="center-text flex-center">
                                    <div>
                                        <div
                                            className="seller-username-icon">
                                            {fix.username[0].toUpperCase()}
                                        </div>

                                    </div>
                                    <div>
                                        <img src="" alt="" />
                                    </div>
                                    <div className="fix-seller-username">
                                        <Link
                                            to="">{fix.username}
                                        </Link>
                                    </div>
                                </div>
                                <div
                                    className="center-text seller-bio">
                                    {user.bio}

                                </div>
                                <div
                                    className="center-text user-ongoing-orders">
                                    <i
                                        className="fas fa-clock text-success">

                                    </i>
                                    <span>
                                        Ongoing Orders:
                                    </span>

                                </div>
                                {(user.username !== loggedUser) &&
                                    <div
                                        className="contact-seller-wrapper">
                                        <button
                                            className="contact-seller-btn">
                                            Contact Seller
                                        </button>
                                    </div>
                                }
                                <div class="secured" style={{ borderTop: "1px solid #ddd" }}>
                                    <div>
                                        <i class="fas fa-shield-alt text-success"></i>
                                    </div>
                                    <div class="center-text">
                                        <div><strong>100% Secured</strong></div>
                                        <div>
                                            Job is done or Money back
                                        </div>
                                    </div>
                                    <div></div>
                                </div>
                                <div style={
                                    {
                                        padding: 10,
                                        fontSize: "1.6rem", color: "#374355", lineHeight: "1.5", borderTop: "1px solid #ddd"
                                    }
                                }>
                                    Your funds are held on Escrow and not sent to the seller. When an order is placed, a page is
                                    created
                                    where you can communicate with the seller
                                </div>
                            </div>
                        </section>
                    </section>
                </div>
                <section>
                    <div>
                        {(userFixes.length > 1) &&
                            <h2 style={{
                                fontSize: "2rem",
                                fontWeight: "bolder", margin: "25px 0px;"
                            }}>More fixes by  {fix.username}
                            </h2>
                        }
                        <UserFixes
                            fixes={userFixes}
                        />

                    </div>

                </section>
                <section>
                    <div>
                        <h2
                            style={{
                                fontSize: "2rem",
                                fontWeight: "bolder",
                                margin: "25px 0px"
                            }}>
                            Recommended for you
                        </h2>
                        <HorizontalScroll>
                            <RecommendationsList
                                handleSlugChange={handleSlugChange}
                                fixes={recommendations} />
                        </HorizontalScroll>


                    </div>

                </section>


            </main>
            <UserFooter />
        </>
    )
}

export default DetailedFix;