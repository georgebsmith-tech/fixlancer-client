import React, { useState, useEffect } from 'react'

import PageHeader from '../../components/PageHeader'
import axios from 'axios'
import { domain } from '../../helperFunctions/domain'
import { Loading } from '../../components/helperComponents/Loading'
import { Link, withRouter } from 'react-router-dom'

const PayForExtra = ({ location, history }) => {
    const [availableBalance, setAvailableBalance] = useState(0)
    const [extra, setExtra] = useState({ content: {} })
    const [fee, setFee] = useState(0)
    const [total, setTotal] = useState(0)
    const [isLoading, setIsloading] = useState(true)
    const [orderID, setOrderID] = useState("")
    async function handleMakePayment() {
        const response = await fetch(domain + "/api/orderchats", {
            method: "put",
            body: JSON.stringify({
                order_id: orderID,
                extra_id: extra.extra_id
            }),
            headers: {
                "Content-Type": "application/json",
                Authorization: 'Bearer ' + localStorage.getItem("auth-token")
            }
        })
        const data = await response.json()
        history.push(`/dashboard/order-chat?oid=${orderID}`)


    }
    useEffect(() => {


        async function fetchData() {
            const url = `${domain}/api/fixes/pay-for-extra${location.search}`
            const response = await axios.get(url, {
                headers: {
                    Authorization: 'Bearer ' + localStorage.getItem("auth-token")
                }
            })
            const data = response.data
            // console.log(data)
            setTotal(data.total)
            setFee(data.fee)
            setAvailableBalance(data.availableBalance.toFixed(2))
            setExtra(data.extra)
            setOrderID(data.order_id)
            setIsloading(false)


        }
        fetchData()
    }, [])
    return (
        <>
            <PageHeader title="Pay for Extras" />
            {
                isLoading ? <Loading
                    height="60vh"
                /> :

                    <main
                        className="main bg-white"
                        style={{ padding: 15 }}>
                        <div
                            className="flex-center">
                            <div
                                style={
                                    {
                                        maxWidth: 500, width: "100%"
                                    }
                                }>
                                <div className="order-fix-main">
                                    <div>
                                        <div>

                                            <Link
                                                to={`/dashboard/order-chat?oid=${orderID}`} className="block back-btn center-text ">
                                                <i className="fa fa-angle-double-left text-link"></i>
                                                <span className="text-link">Back</span>
                                            </Link>

                                        </div>

                                    </div>
                                </div>
                                <section className="border-smooth padd10 font15">
                                    <div
                                        className="flex-between margin10-bottom"
                                        style={{ padding: "5px 0px", borderBottom: "1px solid #ddd" }}>
                                        <div>
                                            Available Balance
                                 </div>
                                        <div>₦{availableBalance}</div>

                                    </div>
                                    <div className="flex-between font15" style={{ marginBottom: 25 }}>
                                        <div>
                                            {extra.content.description}
                                        </div>
                                        <div>
                                            ₦{extra.content.price}
                                        </div>
                                    </div>
                                    <div className="flex-between margin10-bottom">
                                        <div>Fee</div>
                                        <div>₦{fee}</div>
                                    </div>
                                    <div className="flex-between">
                                        <div>
                                            <strong class="bold">Total Price</strong>
                                        </div>
                                        <div className="bold total-price">
                                            ₦{total}
                                        </div>

                                    </div>

                                </section>
                                <div>
                                    <button
                                        onClick={handleMakePayment}
                                        className="button-orange margin5-bottom full-width no-outline"
                                        style={{ marginTop: 15 }}>
                                        Pay Now
                                </button>
                                </div>
                                <div class="font13 center-text">
                                    Your payment will be processed and cannot be undone.
                        </div>


                            </div>

                        </div>

                    </main>
            }
        </>

    )
}

export default withRouter(PayForExtra)