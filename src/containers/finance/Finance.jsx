import React, { useState, useEffect } from 'react'
import UserFooter from "../../components/UserFooter"
import UserHeader from "../../components/UserHeader"
import FinanceNavigation from "./FinanceNavigations"
import { Link } from 'react-router-dom'
import axios from 'axios'
import { getDate } from '../../helperFunctions/getDate'
import { domain } from '../../helperFunctions/domain'
const config = {
    headers: {
        Authorization: `Bearer ${localStorage.getItem("auth-token")}`
    }
}


const Finance = () => {
    const [revenue, setRevenue] = useState({ amount: 0 });
    const [requestIsCancelled, setRequestIsCancelled] = useState(false);
    const [deposit, setDeposit] = useState({ amount: 0 });
    const [refund, setRefund] = useState({ amount: 0 });
    const [withdrawals, setWithdrawals] = useState([]);
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
            try {


                const url_revenue = `${domain}/api/revenues/${username}`
                const revenue_response = await axios.get(url_revenue)
                setRevenue(revenue_response.data.data)

                const url_deposit = `${domain}/api/deposits/${username}`
                const deposits_response = await axios.get(url_deposit)
                setDeposit(deposits_response.data)
                console.log(deposits_response.data)
                const url_refund = `${domain}/api/refunds/${username}`
                const refund_response = await axios.get(url_refund, config)
                setRefund(refund_response.data)
                console.log(refund_response.data)

                const url_withdrawals = `${domain}/api/withdrawals/${username}`
                const withdrawals_list = (await axios.get(url_withdrawals, config)).data
                setWithdrawals(withdrawals_list)
                console.log(withdrawals_list)

                setIsloading(false)
            } catch (err) {

                console.log(err.response.status)
            }
        }
        fetchData()


    }, [])

    const handleCancellation = async (e) => {
        console.log(e.target.dataset.id)
        const body = {
            id: e.target.dataset.id
        }
        const url_withdrawal = `${domain}/api/withdrawals/cancel`
        const newData = (await axios.put(url_withdrawal, body, config)).data
        console.log(newData)
        setRevenue(newData.revenue)
        setWithdrawals(withdrawals.filter(withdrawal => withdrawal._id !== newData.withdrawal._id))
        setRequestIsCancelled(true)
        window.scrollTo(0, 0)
    }
    setTimeout(() => {
        setRequestIsCancelled(false)
    }, 3000)

    let loading = <div
        style={{ width: "100%", height: "100vh" }} className="bg-white font20 flex-center">
        Loading...
    </div>

    return (isLoading ? loading :
        <>
            <UserHeader />
            <main className="main">
                <h1>Finance</h1>
                {requestIsCancelled &&
                    <div
                        className="font14 padd10 profile-updated"
                        style={{
                            marginBottom: 20,
                            marginTop: 20,
                            background: "#1cc88a",
                            borderRadius: 5
                        }}>
                        <span
                            className="text-white">Cancellation was successfull.
                                </span>

                    </div>
                }
                <div className="grid-2-21">
                    <div>
                        <section className="finance-summary">
                            <div>Revenues: <span>₦{revenue.amount.toFixed(2)}</span></div>
                            {depositAmount}
                            {refundAmount}

                        </section>
                        <section className="withdrawal-summary bold">
                            <header className="bold"> <i className="fa fa-bar-chart"></i>Withdrwals</header>
                            {
                                withdrawals.length === 0 ? <div>
                                    No Withdrwals yet
                        </div> :
                                    <section style={{ overflow: "auto", }}>

                                        <ul className="finance-withdrwal">
                                            {withdrawals.map(withdrawal => <li key={withdrawal._id} >
                                                <div style={{ display: "grid", gridTemplateColumns: "repeat(6,1fr)", columnGap: 10 }} className="padd10 align-center ">
                                                    <div className="font15  no-break">{getDate(withdrawal.createdAt)}</div>
                                                    <div
                                                        style={{ marginRight: 10 }}
                                                        className="font15 no-break">{withdrawal.amount}</div>

                                                    <div className="font15 no-break margin10-right"
                                                    >Bank: {withdrawal.bank}</div>
                                                    <div className="font13 no-break">
                                                        Acc. Name: {withdrawal.accName}
                                                    </div>
                                                    <div className="font15 no-break">
                                                        Acc. No.: {withdrawal.accNumber}
                                                    </div>

                                                    <div
                                                        data-id={withdrawal._id}
                                                        onClick={handleCancellation}
                                                        className={`font15 no-break margin10-right text-link-with-hover`}>Cancel Request</div>

                                                </div>
                                            </li>)
                                            }
                                        </ul>
                                    </section>
                            }

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