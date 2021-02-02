import React, { useState, useEffect } from 'react'
import { commafy } from '../../helperFunctions/commafy'
import { Link,withRouter } from 'react-router-dom'
import { domain } from '../../helperFunctions/domain'
import axios from 'axios'
import { getDate } from '../../helperFunctions/getDate'
import { Loading } from '../../components/helperComponents/Loading'
import UserHeader from '../../components/UserHeader'
import UserFooter from '../../components/UserFooter'
import queryString from "query-string"




const RequestOffers = ({ match, location, history }) => {
    const qs = queryString.parse(location.search)
    // console.log(qs)
    const loggedUser = localStorage.getItem("username")
    const [request, setRequest] = useState({
        title: "me and me", delivery: 3, offers: [], price: 2000,
        description: "this is the description",
        createdAt: new Date(), username: "Smith", category: "Graphocs"
    })
    const [prices, setPrices] = useState([3000, 4000, 10000, 4000, 60000, 100000])
    const [price, setPrice] = useState("")
    const [deliveryDays, setDeliveryDays] = useState("")
    const [days, setDays] = useState([1, 2, 3, 4, 5, 6, 7, 10, 13])
    const [fixes, setFixes] = useState([])
    const [isLoading, setIsloading] = useState(true)
    const [modalIsClosed, setModalIsClosed] = useState(true)
    const [fixID, setFixID] = useState("")
    const [description, setDescription] = useState("")
    const [offers, setOffers] = useState([])
    const [edit, setEdit] = useState(location.search)
    const [title, setTitle] = useState("")
    const [offer, setOffer] = useState({})




    useEffect(() => {

        async function fetchData() {



            const url = `${domain}/api/requests/single/${match.params.slug}`
            const response1 = await axios.get(url, {
                headers: {
                    Authorization: 'Bearer ' + localStorage.getItem("auth-token")
                }
            })
            const data = response1.data
            console.log(data)
            setRequest(data.request)
            setFixes(data.fixes)
            setOffers(data.offers)


            if (edit) {
                const offer = data.offers.find(offer => offer._id == qs.offerid)
                setDescription(offer.description)
                setPrice(offer.price)
                setOffer(offer)
                setDeliveryDays(offer.deliveryDays)
                const fix = data.fixes.find(fix => fix.fixID === offer.fixID)
                setFixID(fix.fixID)
                setTitle(fix.title)



            }
            window.scrollTo(0, 0)
            setIsloading(false)

        }
        fetchData()

    }, [location.search, match.url])

    const handleUpdate = () => {
        const body = {
            price,
            offerID: offer._id,
            jobID: request.job_id,
            fixID,
            deliveryDays,
            description,
        }
        async function sendData() {
            const url = `${domain}/api/offers`
            const response = await axios.put(url, body, {
                headers: {
                    Authorization: 'Bearer ' + localStorage.getItem("auth-token")
                }
            })
            console.log(response.data)
            const newOffers = offers.filter(offer => offer._id != response.data._id)
            console.log(newOffers)
            setEdit(false)
            history.push(`${match.url}`)
            setOffers([...newOffers, response.data])


        }

        sendData()

    }
    const handleSumbit = () => {
        const body = {
            price,
            jobID: request.job_id,
            fixID,
            deliveryDays,
            description,
            requestedBy: request.username
        }
        console.log(body)
        async function sendData() {
            const url = `${domain}/api/offers`
            const response = await axios.post(url, body, {
                headers: {
                    Authorization: 'Bearer ' + localStorage.getItem("auth-token")
                }
            })
            console.log(response.data)
            setOffers([...offers, response.data.offer])

        }

        sendData()
    }

    const handleFixChange = (e) => {
        const fix = fixes.find(fix => fix._id === e.target.value)
        setFixID(fix.fixID)
        setTitle(fix.title)
        console.log(fix)
    }
    const handleEdit = (e) => {
        e.preventDefault()
        const offer = offers.find(offer => offer._id === e.target.dataset.offerid)
        setDescription(offer.description)
        setPrice(offer.price)
        setOffer(offer)
        setDeliveryDays(offer.deliveryDays)
        const fix = fixes.find(fix => fix.fixID === offer.fixID)
        setFixID(fix.fixID)
        setTitle(fix.title)
        console.log(fix)
        setEdit(true)
        history.push(`${match.url}?edit=true&offerid=${e.target.dataset.offerid}`)

    }
    let content
    if (offers.length === 0 && loggedUser === request.username) {
        content = <div className="font16 padd10">No offer placed yet.</div>

    } else if (offers.length !== 0 && loggedUser === request.username) {
        content = offers.map(offer => {
            const sumOfRatings = 0
            return <div
                className="font16 card-grid border-bottom">
                <div>
                    <Link to="#" class="block">
                        <img src={offer.image_url} alt=" image of fix" />
                    </Link>
                </div>
                <div>
                    <div
                        className="flex margin10-top">
                        <span
                            className="user-avatar"
                            style={{ backgroundColor: offer.userColor }}>{offer.username[0].toUpperCase()}</span>
                        <a href="#" className="text-link-with-hover font18"
                            style={{ marginLeft: 4 }}>{offer.username}</a>
                    </div>
                    <div
                        className="margin25-top font15" >
                        I{offer.description}
                    </div>
                    <div className="margin20-top font25 bold">
                        ₦{offer.price}
                    </div>
                    <div className="flex margin10-top">
                        <div className="margin40-right">
                            <i className="fa fa-star " style={{ color: sumOfRatings === 0 && "#f1f1f1" }}></i>
                            <span className={"font13" + (sumOfRatings !== 0 && "text-yellow")}> {sumOfRatings.toFixed(1)}</span>{offer.ratings.length != 0 && `(${offer.ratings.length})`}
                        </div>
                        <div>
                            <i className="fas fa-clock text-green font13"></i>
                            <span className="font13">{offer.deliveryDays} day{offer.deliveryDays !== 1 && "s"}</span>
                        </div>
                    </div>
                    <div className="flex-between margin20-top">
                        <div>
                            <button
                                className="bg-white message-seller button-white"
                                onClick={() => setModalIsClosed(false)} >

                                <span className="font15">Message</span>
                            </button>

                        </div>
                        <div>

                            <Link
                                to={`/order-fix/${offer.slug}?job_id=${request.job_id}&offer_id=${offer._id}`}
                                className="font15 button-orange">Order Now
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        }
        )
    } else if (request.status === "awarded") {
        content = <div class="font16" style="padding:30px 10px 0px 10px;">
            <div style={{ padding: "15px 10px", background: "#FCFAE4" }} class="border-smooth">
                <i className="fas fa-exclamation-triangle" style={{ color: "#fe1b1b" }}></i>
                    You cannot place a new offer as job is already awarded
                </div>
        </div>

    } else if (request.status === "closed") {
        content = <div class="font16" style="padding:30px 10px 0px 10px;">
            <div style={{ padding: "15px 10px", background: "#FCFAE4" }} class="border-smooth">
                <i className="fas fa-exclamation-triangle" style={{ color: "#fe1b1b" }}></i>
                    You cannot place a new offer as job is closed.
                </div>
        </div>

    } else if (offers.find(offer => offer.username === loggedUser)) {
        content = offers.filter(offer => offer.username === loggedUser).map(myOffer => {
            let sumOfRatings = 0
            const numberOfratings = myOffer.ratings.length
            myOffer.ratings.forEach(rating => {
                sumOfRatings += rating.rating

            });
            const avgRafing = numberOfratings === 0 ? 0 : sumOfRatings / numberOfratings
            return <div

                className="font16 card-grid border-bottom">
                <div>
                    <a href="#" class="block">
                        <img src={myOffer.image_url} alt="image of the fix" />
                    </a>
                </div>
                <div>
                    <div classNAme="flex margin10-top">
                        <span
                            className="user-avatar"
                            style={{ backgroundColor: myOffer.userColor }}>{myOffer.username[0].toUpperCase()}</span>
                        <Link
                            to="#"
                            className="text-link-with-hover font18"
                            style={
                                {
                                    marginLeft: 4
                                }
                            }>{myOffer.username}
                        </Link>
                    </div>
                    <div
                        className="margin25-top"
                        style={{ lineHeight: "1.5" }}>
                        {myOffer.description}
                    </div>
                    <div class="margin20-top font25 bold">
                        ₦{commafy(myOffer.price)}
                    </div>
                    <div className="flex margin10-top">
                        <div className="margin40-right">
                            <i className="fa fa-star " style={{ color: sumOfRatings === 0 && "#f1f1f1" }}></i>
                            <span className={"font13" + (sumOfRatings !== 0 && "text-yellow")}> {avgRafing.toFixed(1)} </span> {myOffer.ratings.length != 0 && `(${myOffer.ratings.length})`}
                        </div>
                        <div>
                            <i className="fas fa-clock text-green font13"></i>
                            <span className="font13">{myOffer.deliveryDays} day{myOffer.deliveryDays !== 1 && "s"}</span>
                        </div>
                    </div>
                    <div
                        className="margin20-top">
                        <div>
                            <Link
                                onClick={handleEdit}
                                to="#"
                                data-offerid={myOffer._id}

                                className="font15 button-green block">
                                Edit Offer
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        }

        )
    } else if (request.status === "Open") {
        content = <div className="holder">
            <div className="bg-white " style={{ padding: "20px 10px 10px 10px" }}>
                <div>
                    <fieldset>
                        <select
                            name="title"
                            id="title"
                            onChange={handleFixChange}
                            className="bg-white">
                            <option value="">Select Fix</option>
                            {fixes.map(fix =>
                                <option
                                    key={fix._id}
                                    value={fix._id}
                                >{fix.title}
                                </option>
                            )
                            }

                        </select>
                    </fieldset>
                </div>
                <div>
                    <fieldset>
                        <textarea
                            name="description"
                            id="description"
                            cols="30"
                            rows="6"
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            placeholder="Enter your proposals with samples and why they should chose you...">

                        </textarea>
                    </fieldset>
                </div>
                <div>
                    <fieldset>
                        <select
                            value={price}
                            onChange={(e) => setPrice(e.target.value)}
                            name="price"
                            id="price"
                            className="bg-white">
                            <option value="">Price</option>
                            {prices.map((price, idx) =>
                                <option
                                    key={idx}
                                    value={price}>{price}
                                </option>)
                            }
                        </select>
                    </fieldset>
                </div>
                <div>
                    <fieldset>
                        <select
                            name="delivery"
                            id="delivery"
                            value={deliveryDays}
                            onChange={(e) => setDeliveryDays(e.target.value)}
                            className="bg-white">
                            <option
                                value="">
                                Delivery Days
                            </option>
                            {days.map((days, idx) =>
                                <option
                                    key={idx}
                                    value={days}>
                                    {days} days
                                </option>)}

                        </select>
                    </fieldset>
                </div>
                <div class="font16">

                    <input type="checkbox" id="accept-terms" className="margin3-right" />
                    <span>
                        I accept i've read the project and can complete
                        </span>

                </div>
                <div class="margin30-top">
                    <fieldset>
                        <button
                            onClick={handleSumbit}
                            className="place-offer">Place Offer
                        </button>
                    </fieldset>
                </div>
            </div>

        </div>


    }

    if (edit) {
        content = <div className="holder">
            <div className="bg-white " style={{ padding: "20px 10px 10px 10px" }}>
                <div>
                    <fieldset>
                        <select

                            name="title"
                            id="title"
                            onChange={handleFixChange}
                            className="bg-white">
                            <option value="">{title}</option>
                            {fixes.map(fix =>
                                <option
                                    key={fix._id}
                                    value={fix._id}
                                >{fix.title}
                                </option>
                            )
                            }

                        </select>
                    </fieldset>
                </div>
                <div>
                    <fieldset>
                        <textarea
                            name="description"
                            id="description"
                            cols="30"
                            rows="6"
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            placeholder="Enter your proposals with samples and why they should chose you...">

                        </textarea>
                    </fieldset>
                </div>
                <div>
                    <fieldset>
                        <select
                            value={price}
                            onChange={(e) => setPrice(e.target.value)}
                            name="price"
                            id="price"
                            className="bg-white">
                            <option value="">Price</option>
                            {prices.map((price, idx) =>
                                <option
                                    key={idx}
                                    value={price}>{price}
                                </option>)
                            }
                        </select>
                    </fieldset>
                </div>
                <div>
                    <fieldset>
                        <select
                            name="delivery"
                            id="delivery"
                            value={deliveryDays}
                            onChange={(e) => setDeliveryDays(e.target.value)}
                            className="bg-white">
                            <option
                                value="">
                                Delivery Days
                            </option>
                            {days.map((days, idx) =>
                                <option
                                    key={idx}
                                    value={days}>
                                    {days} days
                                </option>)}

                        </select>
                    </fieldset>
                </div>
                <div className="font16">

                    <input type="checkbox" id="accept-terms" className="margin3-right" />
                    <span>
                        I accept i've read the project and can complete
                        </span>

                </div>
                <div className="margin30-top">
                    <fieldset>
                        <button
                            onClick={handleUpdate}
                            className="place-offer">Update Offer
                        </button>
                    </fieldset>
                </div>
            </div>

        </div>
    }


    const handleCloseModal = () => {
        setModalIsClosed(true)
    }

    return (
        <>
            { !modalIsClosed && <Modal handleCloseModal={handleCloseModal} />

            }

            <UserHeader />
            {
                isLoading ? <Loading
                    height="80vh"
                    message="Loading Job Requests" /> :

                    <main className="main a-request">
                        {request.status === "awarded" &&
                            <div className="font16 request-status-alert margin10-top">
                                <i className="fa fa-check-circle text-green"></i> <span>Job has been awarded</span>
                            </div>

                        }
                        {request.status === "closed" &&
                            <div className="font16 request-status-alert margin10-top" style={{ border: "1px solid #fe1b1b" }}>
                                <i className="fa fa-exclamation-triangle text-green" style={{ color: "#fe1b1b" }}></i> <span>Job is closed.</span>
                            </div>

                        }
                        {(request.status === "Open" && loggedUser === request.username) &&
                            <div>
                                <button className="close-request"> Mark as closed</button>
                            </div>

                        }


                        <div className="font16 request-status-alert margin10-top hide closed-alert" style={{ border: "1px solid #fe1b1b" }}>
                            <i className="fa fa-exclamation-triangle text-green" style={{ color: "#fe1b1b" }}></i> <span>Job is closed.</span>
                        </div>
                        <div class="margin10-top border-smooth card-shadow">
                            <h1 class="request-title bg-green2">
                                {request.title}
                            </h1>
                            <div class="flex-between font16 the-request-meta border-bottom bg-white">
                                <div>
                                    <i class="fas fa-clock bold"></i>
                                    <span class="bold"> {request.delivery}days</span>
                                </div>
                                <div>
                                    <i class="fa fa-print bold"></i>
                                    <span class="bold number-of-offers">{offers.length} {offers.length === 1 ? "offer" : "offers"} </span>
                                </div>
                                <div>
                                    <span class="text-green bold">₦{commafy(request.price)}</span>
                                </div>

                            </div>
                            <div class="request-description font16 bg-white">
                                {request.description}

                            </div>

                        </div>
                        <div class="margin20-top font14">
                            <div>
                                Category: {request.category}
                            </div>
                            <div
                                className="">
                                by: <Link to="#"
                                    className="text-link-with-hover"> {request.username}</Link> -
                        <i
                                    className="fas fa-clock font14">

                                </i>
                                <span>
                                    {getDate(request.createdAt)}
                                </span>


                            </div>
                        </div>
                        <div
                            className="card-shadow margin25-top padd20-bottom border-smooth bg-white">
                            <h2 className="fon16 padd-head border-bottom" style={{ background: "#f8f9fc" }}>
                                <i
                                    className="fa fa-print bold">

                                </i>
                                <span>
                                    {loggedUser === request.username ? "Offers" : "Offer"
                                    }
                                </span>

                            </h2>
                            {content}


                        </div>


                    </main>
            }
            <UserFooter />

        </>
    )
}


function Modal({ handleCloseModal }) {
    return (
        <div class="message-modal"
            style={
                {
                    width: "100vw",
                    height: "100vh",
                    background: "rgba(0,0,0,0.5)",
                    position: "fixed",
                    left: 0,
                    top: 0,
                    zIndex: 5,
                    overflow: "hidden"
                }
            }>
            <div className="flex-center" style={{ height: "100vh", padding: 15, width: "100vw", boxSizing: "border-box" }}>
                <div style={{ maxWidth: 600, background: "white" }} className="border-smooth">
                    <div className="bg-heading padd30 flex-between">
                        <h2>
                            <i className="far fa-comments"></i>
                            <span className="bold">Contact <span className="bold seller"></span></span>

                        </h2>
                        <div
                            onClick={handleCloseModal}
                            className="font16">
                            <a href="#" style={{ background: "#415478", padding: "6px 12px", borderRadius: 6 }}
                                className="close-message">
                                <i
                                    className="fa fa-angle-double-left text-white font15">

                                </i>
                                <span
                                    className="text-white font14">
                                    back
                                </span>
                            </a>
                        </div>
                    </div>
                    <div class="padd20">
                        <div>
                            <ul className="font13">
                                <li style={{ marginBottom: 8, lineHeight: "1.4" }}>
                                    <i class="fa fa-exclamation-circle"></i>
                                When you place order on this platform your funds are held on escrow and not sent to the
                                seller

                            </li>
                                <li>
                                    <i className="fa fa-exclamation-circle"></i>
                                Your job is also done to your satisfaction or 100% refund
                            </li>
                            </ul>
                        </div>
                        <div>
                            <div className="margin10-top">
                                <fieldset>
                                    <textarea name="" id="message" cols="30" rows="5"
                                        placeholder="Type your message..."></textarea>
                                </fieldset>
                            </div>
                            <div className="flex-end">
                                <button className="bg-green text-white border-green font15 send"
                                    style={{ padding: "8px 15px", outline: "none", borderRadius: 6 }}>Send</button>
                            </div>
                        </div>
                    </div>

                </div>
            </div>

        </div>

    )
}

export default withRouter(RequestOffers)