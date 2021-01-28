import React, { useState, useEffect } from 'react'
import UserFooter from "../../components/UserFooter"
import UserHeader from "../../components/UserHeader"
import FinanceNavigation from "./FinanceNavigations"
import { Link } from 'react-router-dom';
import axios from 'axios';
import { domain } from '../../helperFunctions/domain';
import { commafy } from '../../helperFunctions/commafy'
// import { DataLayerContext } from '../../context/DataLayer'

const config = {
    headers: {
        Authorization: `Bearer ${localStorage.getItem("auth-token")}`
    }
}


const Withdraw = ({ history }) => {
    // const [state, dispatch] = React.useContext(DataLayerContext);
    // console.log(state)
    const [revenue, setRevenue] = useState({ amount: 0 })
    const [error, setError] = useState("")
    const [withdrawalLimit, setWithdrawalLimit] = useState("")
    const [isLoading, setIsloading] = useState(true)
    const [amount, setAmount] = useState("")
    const [password, setPassword] = useState("")
    const username = localStorage.getItem("username")
    const [passwordError, setPasswordError] = useState(false)
    const [amountError, setAmountError] = useState(false)
    const [bankDetails, setBankDetails] = useState({})
    useEffect(() => {
        async function fetchData() {
            const url = `${domain}/api/revenues/${username}`
            const response = await axios.get(url)
            setRevenue(response.data.data)
            console.log(response.data.data)
            setIsloading(false)
            const limit_url = `${domain}/api/settings/withdrawal_limit`
            const limit_data = (await axios.get(limit_url)).data
            // console.log(limit_data)
            setWithdrawalLimit(limit_data.config.limit)

            const user_url = `${domain}/api/users/${username}?content=full`
            const user_data = (await axios.get(user_url, config)).data.data
            console.log(user_data)
            setBankDetails(user_data.bankDetails)
        }
        fetchData()
    }, [])
    const submitRequest = () => {
        setError("")
        setAmountError(false)
        setPasswordError(false)
        if (amount < withdrawalLimit) {
            setError(`request must be at least ${withdrawalLimit}`)
            setAmountError(true)
            window.scrollTo(0, 0)
            return

        }
        if (!bankDetails.accNumber || !bankDetails.accName || !bankDetails.bankName) {
            setError(`Complete Bank details must be provided.`)
            window.scrollTo(0, 0)
            return

        }
        const body = {
            username,
            amount,
            password,
            accName: bankDetails.accName,
            accNumber: bankDetails.accNumber,
            bank: bankDetails.bankName

        }
        const sendData = async () => {
            try {
                const response = await axios.post(`${domain}/api/withdrawals`, body)
                const data = response.data
                console.log(data)
                setRevenue(data.revenue)
                window.scrollTo(0, 0)
                history.push(`/dashboard/finance`)
            } catch (err) {
                window.scrollTo(0, 0)
                if (err.response.status === 401) {
                    setPasswordError(true)
                } else if (err.response.status === 400) {
                    setAmountError(true)
                }
                setError(err.response.data.error)
            }
        }
        sendData()
        console.log(body)
    }

    return (


        <>
            <UserHeader />
            <main className="main">
                <h1>Finance</h1>
                <div className="grid-2-21 margin20-top">
                    <section className="withdrawal-summary">
                        <header> <i className="fa fa-bar-chart"></i>Request Withdrwals</header>
                        <div className="sect"
                            style={{ margin: "15px 25px 35px 25px", paddingLeft: 10, borderLeft: "3px solid #1cc88a" }}>
                            <div>Revenues: <span>₦{revenue.amount.toFixed(2)}</span></div>

                        </div>
                        {
                            error &&
                            <section style={{ margin: "0px 25px 5px 25px" }} className="font13 padd10 border-smooth bd-red">
                                {error}
                            </section>


                        }


                        <div className="sect">
                            <fieldset>
                                <label htmlFor=" amount">- Enter Amount</label>
                                <input
                                    onChange={(e) => setAmount(e.target.value)}
                                    value={amount}
                                    type="number" placeholder="Amount" name="amount"
                                    className={amountError && "bd-red"} />
                            </fieldset>
                        </div>
                        <div className="finance-bank-details" style={{ paddingTop: 10 }}>
                            <div className="border-smooth">
                                <Link className="overlay-bank flex-center block" to="/dashboard/edit" title="Edit Bank details">
                                    <span className="text-white"> <i className="fa fa-pencil text-white margin3-right"></i>Edit</span>

                                </Link>
                                <div>
                                    <span>Account Name:{bankDetails.accName} </span><span></span>
                                </div>
                                <div>
                                    <span>Account No.:{bankDetails.accNumber} </span><span></span>
                                </div>
                                <div>
                                    <span>Bank:{bankDetails.bankName} </span><span></span>
                                </div>
                            </div>
                        </div>
                        <div className="sect">
                            <fieldset>
                                <input
                                    onChange={(e) => setPassword(e.target.value)}
                                    value={password}
                                    type="password" placeholder="Current password" name="password"
                                    className={passwordError && "bd-red"}
                                />
                            </fieldset>
                        </div>
                        <div className="sect">
                            <fieldset>
                                <button
                                    onClick={submitRequest}
                                    className="button">Withdraw</button>
                            </fieldset>
                        </div>
                        <div className="sect">
                            <ul className="font13">
                                <li style={{ marginBottom: 7 }}>* Minimum withdrawal is NGN{commafy(withdrawalLimit)}</li>
                                <li style={{ marginBottom: 7 }}>* A fee of NGN100 will be charged for every withdrawal to
                                bank</li>
                                <li style={{ marginBottom: 7 }}>* Withdrawals are processed within 2-3 business days</li>
                            </ul>
                        </div>

                    </section>
                    <section>
                        <FinanceNavigation />
                    </section>
                </div>




            </main>
            <UserFooter />
        </>
    )


}

export default Withdraw