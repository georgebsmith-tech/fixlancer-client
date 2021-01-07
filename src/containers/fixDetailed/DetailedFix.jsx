import React, { useState, useEffect } from 'react'

import UserHeader from '../../components/UserHeader'
import UserFooter from '../../components/UserFooter'
import { Link } from 'react-router-dom'
import axios from 'axios'
import { domain } from '../../helperFunctions/domain'
import UserFixes from '../../components/fixes/RecommendationList'
import RecommendationsList from '../../components/fixes/FeaturedFixesList'
import HorizontalScroll from '../../components/helperComponents/HorinzontalScroll'
import { Loading } from '../../components/helperComponents/Loading'
import AboutFix from './AboutFix'
import AboutSeller from './AboutSeller'


const TrustButton = () => {
    return (
        <div>
            <button className="bg-green text-white padd10 border5-radius padd5-top-bottom border-green no-outline">
                Mark as trusted
                             </button>
        </div>
    )
}
const ApproveFix = () => {
    return (
        <div>
            <button className="bg-green text-white padd10 border5-radius padd5-top-bottom border-green no-outline">
                Approve Fix
                             </button>
        </div>
    )
}

const DetailedFix = ({ match, location, history }) => {
    const isAdmin = localStorage.getItem("role") === "admin" ? true : false
    const [sent, setSent] = useState(false)
    const [isActive, setIsActive] = useState(true)
    const [isLoading, setIsLoading] = useState(true)
    const [titleSlug, setTitleSlug] = useState(match.params.titleSlug)
    const loggedUser = localStorage.getItem("username")
    const [user, setUser] = useState({ bi0: "" })
    const [userFixes, setUserFixes] = useState([])
    const [recommendations, setRecommendations] = useState([])
    const activeBtnText = isActive ? "Deactivate" : "Activate"
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
            if (data.user)
                setUser(data.user)
            setUserFixes(data.userFixes)
            setRecommendations(data.recommendations)
            setIsActive(data.fix.active)
            window.scrollTo(0, 0)
            setIsLoading(false)


        }
        fetchData()

    }, [match.params])
    const handleFixState = () => {
        // setIsLoading(true)
        async function fetchData() {
            const url = `${domain}/api/fixes/state`
            const response1 = await axios.put(url, { _id: fix._id, active: !isActive }, {
                headers: {
                    Authorization: 'Bearer ' + localStorage.getItem("auth-token")
                }
            })
            const data = response1.data
            console.log(data)
            setIsActive(data.active)
            // setIsLoading(false)
        }
        fetchData()

    }
    const handleSlugChange = () => {
        // console.log("clicked")
        setTitleSlug(match.params.titleSlug)
    }

    return (
        <>
            <UserHeader />
            {
                isLoading ? <Loading
                    message="Loading fix details"
                    height="85vh" /> :

                    <main
                        className="main">
                        {
                            sent &&
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
                        }
                        {
                            isAdmin &&
                            <>

                                {
                                    fix.approved &&
                                    <TrustButton />
                                }
                                {
                                    !fix.approved &&
                                    <ApproveFix />
                                }
                            </>
                        }
                        {
                            (!isActive && fix.username !== loggedUser) &&
                            <div
                                className="text-white font15 bg-red center-text padd20">
                                This fix is currently deactivated.
                            </div>
                        }

                        <div class="grid-2-21">
                            <AboutFix
                                fix={fix}
                                user={user}
                                loggedUser={loggedUser}
                            />
                            <section>
                                {(fix.username === loggedUser)
                                    &&


                                    <div
                                        className="flex-between">
                                        <button
                                            onClick={() => { history.push("/dashboard/edit-fix?fid=" + fix.fixID) }}
                                            className="no-break full-width no-bd border5-radius padd15 bg-orange padd5-top-bottom text-white center-text font14  border5-radius no-outline margin10-right block">Edit fix ₦{fix.price}
                                        </button>
                                        <button
                                            style={
                                                {
                                                    border: "1px solid #ddd"
                                                }
                                            }
                                            onClick={handleFixState}
                                            className={"full-width font14 padd10 padd5-top-bottom border5-radius no-outline no-bd margin10-right block " + (isActive && "bg-fade")}>{activeBtnText}</button>
                                        <button className=" full-width font14 padd10 padd5-top-bottom no-outline border5-radius no-bd bg-fade">Delete Fix</button>
                                    </div>

                                }
                                <section
                                    id="about-seller-section">
                                    <h2>About the Seller</h2>
                                    <div>
                                        <div
                                            className="online-status"
                                            style={{ padding: "10px 15px 15px 10px" }}>
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
                                                    style={{ backgroundColor: user.userColor }}
                                                    className="seller-username-icon">
                                                    {fix.username[0].toUpperCase()}
                                                </div>

                                            </div>
                                            <div>
                                                <img src="" alt="" />
                                            </div>
                                            <div
                                                className="fix-seller-username">
                                                <Link
                                                    to={`/u/${fix.username}`}>{fix.username}
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
                        <section className=" ">
                            <div>
                                {(userFixes.length > 1) &&
                                    <h2
                                        className="margin10-bottom margin40-top"

                                        style={{
                                            fontSize: "2rem",
                                            fontWeight: "bolder"

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
            }
            <UserFooter />
        </>
    )
}

export default DetailedFix;