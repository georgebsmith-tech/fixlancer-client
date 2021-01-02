import React, { useState, useEffect } from 'react'
import UserFooter from "../../components/UserFooter"
import UserHeader from "../../components/UserHeader"
import FinanceNavigation from "./FinanceNavigations"
import { Link } from 'react-router-dom'
import axios from 'axios'
import { domain } from '../../helperFunctions/domain'

const Finance = () => {
    const [revenue, setRevenue] = useState({ amount: 0 });
    const [deposit, setDeposit] = useState({ amount: 0 });
    const [refund, setRefund] = useState({ amount: 0 });
    const [isLoading, setIsloading] = useState(true)
    const username = localStorage.getItem("username")
    let extraSummary
    let depositAmount
    let refundAmount
    if (deposit.amount > 0)
        depositAmount = <div>Deposits: <span>₦{deposit.amount.toFixed(2)}</span></div>
    if (refund.amount > 0)
        refundAmount = <div>Refunds: <span>₦{refund.amount.toFixed(2)}</span></div>
    useEffect(() => {
        async function fetchData() {
            const url_revenue = `${domain}/api/revenues/${username}`
            const revenue_response = await axios.get(url_revenue)
            setRevenue(revenue_response.data.data)

            const url_deposit = `${domain}/api/deposits/${username}`
            const deposits_response = await axios.get(url_deposit)
            setDeposit(deposits_response.data)
            console.log(deposits_response.data)
            const url_refund = `${domain}/api/refunds/${username}`
            const refund_response = await axios.get(url_refund)
            setRefund(refund_response.data)
            console.log(refund_response.data)
            setIsloading(false)
        }
        fetchData()


    }, [])
    let loading = <div
        style={{ width: "100%", height: "100vh" }} className="bg-white font20 flex-center">
        Loading...
    </div>

    return (isLoading ? loading :
        <>
            <UserHeader />
            <main className="main">
                <h1>Finance</h1>
                <div className="grid-2-21">
                    <div>
                        <section className="finance-summary">
                            <div>Revenues: <span>₦{revenue.amount.toFixed(2)}</span></div>
                            {depositAmount}
                            {refundAmount}




                        </section>
                        <section className="withdrawal-summary bold">
                            <header className="bold"> <i className="fa fa-bar-chart"></i>Withdrwals</header>
                            <div>
                                No Withdrwals yet
                        </div>
                        </section>

                    </div>
                    <FinanceNavigation />


                </div>

            </main>

            <UserFooter />
        </>
    )
}

export default Finance