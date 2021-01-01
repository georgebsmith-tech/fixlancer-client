import React, { useState, useEffect } from 'react'
import { Loading } from '../../components/helperComponents/Loading'
import axios from 'axios'
import { domain } from '../../helperFunctions/domain'
import { Link } from 'react-router-dom'
import PageHeader from '../../components/PageHeader'

import { FaClock } from 'react-icons/fa'
function Modal() {
    return (
        <div class="modal-wrapper">


            <div class="order-modal padd10 ">
                <div class="bg-white padd10 border-smooth full-width">
                    <div class="font16">
                        <h2 class="margin20-bottom margin20-top bold center-text">
                            Just a Sec...
                </h2>
                        <div class="font16">
                            <div class="center-text margin30-bottom">
                                We're working out details of your Order.
                    </div>
                        </div>


                    </div>


                </div>
            </div>
        </div>
    )
}

const OrderFix = ({ match, location, history }) => {
    // console.log(location)
    const [balance, setBalance] = useState(0)
    const [fix, setFix] = useState({ price: 200 })
    const [fee, setFee] = useState(2900)
    const [total, setTotal] = useState(2900)
    const [custom, setCustom] = useState(true)
    const [isLoading, setIsloading] = useState(true)
    const [modalIsClosed, setModalIsClosed] = useState(true)
    const [jobId, setJobId] = useState("")
    const [extras, setExtras] = useState("")

    const loggedUser = localStorage.getItem("username")
    useEffect(() => {
        async function fetchData() {
            const url = `${domain}/api/fixes/order-fix/${match.params.slug}${location.search}`
            const response1 = await axios.get(url, {
                headers: {
                    Authorization: 'Bearer ' + localStorage.getItem("auth-token")
                }
            })
            const data = response1.data
            console.log(data)
            // setRequest(data.request)
            setFix(data.fix)
            setCustom(data.custom)
            setBalance(data.balance)
            setJobId(data.jobId)
            setIsloading(false)
            setFee(data.fee)
            setTotal(data.total)
            setExtras(data.extras)
        }
        fetchData()
        window.scrollTo(0, 0)

    }, [])
    const createOrder = async () => {
        let date = new Date()
        try {


            const data = {
                seller: fix.username,
                buyer: loggedUser,
                delivery_date: new Date(date.setDate(date.getDate() + fix.delivery_days)),
                job_id: jobId,
                price: fix.price,
                fixID: fix.fixID,
                fee
            }
            const outData = await fetchData(data, `${domain}/api/sales`)

            console.log(outData)
            return outData
        } catch (err) {
            console.log(err)
        }



    }
    async function fetchData(data, url) {
        const resp = await fetch(url, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(data)
        })
        const outData = await resp.json()


        return outData

    }

    const handleModal = () => {
        createOrder()
        setModalIsClosed(false)
        setTimeout(() => {
            if (fix.fixID)
                history.push(`/dashboard/order-requirements?fixid=${match.params.slug}`)
            else
                history.push(`/dashboard/order-requirements${location.search}&fixid=${match.params.slug}`)

        }, 2000)
    }
    return (
        <>
            <PageHeader title="Order Fix" />

            {
                !modalIsClosed &&
                <Modal />
            }
            {
                isLoading ?
                    <Loading
                        height="100vh"

                    /> :


                    <main
                        className="main"
                        style={{
                            backgroundColor: "white",
                            padding: 15
                        }}>

                        <div class="order-fix-main">
                            <div>
                                {
                                    (custom) ?
                                        <Link
                                            to={`/dashboard/${fix.mainSlug}`} class="block back-btn center-text ">
                                            <i className="fa fa-angle-double-left text-link"></i>
                                            <span className="text-link">Back</span>
                                        </Link> :
                                        <Link
                                            to={`/fix/${fix.subcatSlug}/${fix.titleSlug}`} class="block back-btn center-text ">
                                            <i class="fa fa-angle-double-left text-link"></i>
                                            <span
                                                className="text-link">Back
                                            </span>
                                        </Link>

                                }
                            </div>
                        </div>
                        <div class="order-top-grid">
                            <div>
                                <img src="<%= fix.images_url[0] %>" alt="" />
                            </div>
                            <div>
                                <Link
                                    className="block fix-title"
                                    to={`/fix/${fix.subcatSlug}/${fix.titleSlug}`}>
                                    {fix.title}
                                </Link>
                                <div
                                    className="order-fix-meta">
                                    <div>
                                        by <Link

                                            to={`/u/${fix.username}`}
                                            className="text-link seller">{fix.username}
                                        </Link>
                                    </div>
                                    <div>
                                        <FaClock
                                            size="1.3rem"
                                            className="margin3-right"
                                        />
                                        <span className="font15">{fix.delivery_days} day(s)</span>
                                    </div>


                                </div>

                            </div>
                        </div>




                        <section
                            className="border-smooth padd10 font15">
                            <div class="flex-between" margin10-bottom style={{ padding: "5px 0px", borderBottom: "1px solid #ddd" }}>
                                <div>
                                    Available Balance
                                </div>
                                <div>₦{balance.toFixed(2)}</div>
                            </div>
                            <div className="margin40-bottom">
                                <div
                                    className="flex-between font15 margin20-top padd5-top-bottom border-bottom"
                                >
                                    <div>
                                        Fix Price
                                </div>
                                    <div>
                                        ₦{fix.price.toFixed(2)}
                                    </div>
                                </div>
                                {
                                    extras * 1 === 12 && fix.extras.map(extra => <div
                                        className="flex-between font15 padd5-top-bottom  border-bottom">
                                        <div>
                                            {extra.description}
                                        </div>
                                        <div>
                                            ₦{extra.price.toFixed(2)}
                                        </div>
                                    </div>)
                                }
                                {
                                    extras * 1 === 1 && <div
                                        className="flex-between font15 padd5-top-bottom  border-bottom">
                                        <div>
                                            {fix.extras[0].description}
                                        </div>
                                        <div>
                                            ₦{fix.extras[0].price.toFixed(2)}
                                        </div>
                                    </div>
                                }
                                {
                                    extras * 1 === 2 && <div
                                        className="flex-between font15 padd5-top-bottom  border-bottom">
                                        <div>
                                            {fix.extras[1].description}
                                        </div>
                                        <div>
                                            ₦{fix.extras[1].price.toFixed(2)}
                                        </div>
                                    </div>
                                }
                            </div>
                            <div style={{ marginBottom: 25 }}>
                                <input type="text" placeholder="Enter promo code" className="promo-input" />
                                <button className="button promo-apply">Apply</button>
                            </div>
                            <div className="flex-between margin10-bottom" >
                                <div>Fee</div>
                                <div>₦{fee.toFixed(2)}</div>
                            </div>
                            <div class="flex-between">
                                <div>
                                    <strong class="bold">Total Price</strong>
                                </div>
                                <div class="bold total-price">
                                    ₦{total.toFixed(2)}
                                </div>

                            </div>


                        </section>
                        <div>
                            {(total > balance) ?
                                <button
                                    className="button" id="order-purchase-btn" style={
                                        {
                                            marginTop: 15
                                        }
                                    }>
                                    Proceed to Purchase
                        </button>
                                :
                                <button
                                    onClick={handleModal}
                                    className="button confirm-payment" id="order-purchase-btn" style={{
                                        marginTop: 15
                                    }}
                                >Confirm and pay
                                </button>
                            }

                        </div>
                        {
                            total > balance &&
                            <div

                                className="center-text font15">
                                <i
                                    className="fas fa-info-circle font15">

                                </i>
                You won't be charged yet
            </div>
                        }
                        <div class="center-text border-smooth font15 get-help">
                            <div>
                                Having difficulties making payment?
                    </div>
                            <a href="" class="text-link">Contact Us</a>
                        </div>

                        <div class="tips">
                            <h2>Important Tips:</h2>
                            <ul>
                                <li>* Your funds are held on escrow and not sent directly to the seller.</li>
                                <li>* Seller can only receive funds when you release it upon satisfaction with the work done.
                        </li>
                                <li>* 100% Money Back Guarantee if you are not satisfied with the work done.</li>
                            </ul>
                        </div>


                    </main>
            }


        </>
    )
}

export default OrderFix;