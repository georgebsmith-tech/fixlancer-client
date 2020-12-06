import React, { useState } from 'react'

import { Link } from 'react-router-dom'
import axios from 'axios'
import { domain } from '../../../helperFunctions/domain'

export const BalanceMobile = ({ wallet }) => {
    const [walletType, setWalletType] = useState("")
    const [revenues, setRevenues] = useState(wallet.revenues)
    const [deposits, setDeposits] = useState(wallet.deposits)
    const [pendings, setPendings] = useState(wallet.pendings)
    const [refunds, setRefunds] = useState(wallet.refunds)
    const [amount, setAmount] = useState("")
    const [action, setAction] = useState("")
    const user = wallet.username
    const config = {
        headers: {
            Authorization: `Bearer ${localStorage.getItem("auth-token")}`
        }

    }

    const style = {
        padd: {
            padding: "5px 10px"
        }
    }
    const handleSubmit = async () => {
        const body = {
            walletType,
            amount,
            action,
            username: user
        }
        async function fetchData() {
            const url = `${domain}/api/wallets`

            const response = await axios.put(url, body, config)
            const data = response.data

            return data
        }
        const data = await fetchData()
        console.log(data)
        switch (walletType) {
            case "deposit":
                console.log(data)
                setDeposits(data.amount * 1)
                break;
            case "refund":
                console.log(data)
                setRefunds(data.amount * 1)
                break;
            case "pending":
                console.log(data)
                setPendings(data.amount * 1)
                break;
            case "revenue":
                console.log(data)
                setRevenues(data.amount * 1)
                break;
            default:
                console.log("Error")
        }




    }

    return (
        <li className="padd10 border-smooth margin5-bottom bg-white">
            <ul className="font14">
                <li
                    className="margin5-bottom">
                    <span></span>
                    <Link to={`/u/${wallet.username}`}
                        className="text-link-with-hover">
                        {wallet.username}
                    </Link>
                </li>
                <li
                    className="margin5-bottom">Revenues: ₦{revenues.toFixed(2)}
                </li>
                <li
                    className="margin5-bottom">Pending: ₦{pendings.toFixed(2)}
                </li>
                <li
                    className="margin5-bottom">Refunds: ₦{refunds.toFixed(2)}
                </li>
                <li
                    className="margin5-bottom">Deposits: ₦{deposits.toFixed(2)}
                </li>
                <li
                    className="margin5-bottom"
                >
                    <select
                        onChange={(e) => setWalletType(e.target.value)}
                        style={style.padd}
                        value={walletType}
                        className="border-smooth no-outline">
                        <option value="">Select wallet...</option>
                        <option value="pending">Pending</option>
                        <option value="deposit">Deposit</option>
                        <option value="refund">Refunds</option>
                        <option value="revenue">Revenues</option>

                    </select>
                </li>
                <li
                    className="margin5-bottom">
                    <input
                        value={amount}
                        onChange={(e) => setAmount(e.target.value)}
                        type="text" placeholder="Amount"
                        style={style.padd}
                        className="border-smooth no-outline"
                    />
                </li>
                <li
                    className="margin5-bottom">
                    <span className="margin10-right">Action:</span>
                    <div
                        onChange={(e) => setAction(e.target.value)}>
                        <span className="margin10-right">
                            <input
                                type="radio"
                                name="action"
                                value="inc"
                                className="margin5-right" />
                                Increase

                        </span>
                        <span>
                            <input
                                type="radio"
                                name="action"
                                value="dec"
                                className="margin5-right"
                            />
                            Decrease
                        </span>
                    </div>
                </li>
                <li>
                    <button
                        onClick={handleSubmit}
                        className="padd10-sides text-white bg-dark-blue border5-radius border-dark-blue no-outline">
                        Update
                    </button>
                </li>
            </ul>
        </li>
    )
}

export const BalanceDesktop = ({ wallet }) => {
    const [walletType, setWalletType] = useState("")
    const [revenues, setRevenues] = useState(wallet.revenues)
    const [deposits, setDeposits] = useState(wallet.deposits)
    const [pendings, setPendings] = useState(wallet.pendings)
    const [refunds, setRefunds] = useState(wallet.refunds)
    const [amount, setAmount] = useState("")
    const [action, setAction] = useState("")
    const user = wallet.username
    const config = {
        headers: {
            Authorization: `Bearer ${localStorage.getItem("auth-token")}`
        }

    }

    const style = {
        padd: {
            padding: "5px 6px"
        },
        grid7: {
            display: "grid",
            gridTemplateColumns: " 25px 100px repeat(5,1fr) 100px",
            columnGap: 10,
            alignItems: "center"
        },
        grid4: {
            display: "grid",
            gridTemplateColumns: " repeat(4,150px)",
            alignItems: "center"
        },
        circle: {
            height: 25,
            width: 25,
            borderRadius: 100,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            fontWeight: "bold",
            padding: 7

        }
    }

    const handleSubmit = async () => {
        const body = {
            walletType,
            amount,
            action,
            username: user
        }
        async function fetchData() {
            const url = `${domain}/api/wallets`

            const response = await axios.put(url, body, config)
            const data = response.data

            return data
        }
        const data = await fetchData()
        console.log(data)
        switch (walletType) {
            case "deposit":
                console.log(data)
                setDeposits(data.amount * 1)
                break;
            case "refund":
                console.log(data)
                setRefunds(data.amount * 1)
                break;
            case "pending":
                console.log(data)
                setPendings(data.amount * 1)
                break;
            case "revenue":
                console.log(data)
                setRevenues(data.amount * 1)
                break;
            default:
                console.log("Error")
        }
    }

    return (
        <li className="padd10 border-smooth margin5-bottom bg-white">
            <ul className="font14 margin10-bottom" style={style.grid7}>
                <li className="margin10-right">
                    {
                        wallet.imageURL ? <img src={wallet.imageURL}
                            style={style.circle}
                        /> : <span
                            style={
                                {
                                    backgroundColor: wallet.userColor,
                                    ...style.circle

                                }}
                            className="text-white">
                                {wallet.username[0].toUpperCase()}
                            </span>
                    }
                </li>
                <li
                    className="margin5-bottom">
                    <span></span>
                    <Link to={`/u/${wallet.username}`}
                        className="text-link-with-hover">
                        {wallet.username}
                    </Link>
                </li>
                <li
                    className="margin5-bottom">Revenues: ₦{revenues.toFixed(2)}
                </li>
                <li
                    className="margin5-bottom">Pending: ₦{pendings.toFixed(2)}
                </li>
                <li
                    className="margin5-bottom">Refunds: ₦{refunds.toFixed(2)}
                </li>
                <li
                    className="margin5-bottom">Deposits: ₦{deposits.toFixed(2)}
                </li>
            </ul>
            <ul className="flex align-center">
                <li
                    className="margin5-bottom margin10-right"
                >
                    <select
                        onChange={(e) => setWalletType(e.target.value)}
                        style={style.padd}
                        value={walletType}
                        className="border-smooth no-outline font13">
                        <option value="">Select wallet...</option>
                        <option value="pending">Pending</option>
                        <option value="deposit">Deposit</option>
                        <option value="refund">Refunds</option>
                        <option value="revenue">Revenues</option>

                    </select>
                </li>
                <li
                    className="margin5-bottom margin10-right">
                    <input
                        value={amount}
                        onChange={(e) => setAmount(e.target.value)}
                        type="text" placeholder="Amount"
                        style={style.padd}
                        className="border-smooth no-outline font13"
                    />
                </li>
                <li
                    className="margin5-bottom margin10-right">

                    <div
                        onChange={(e) => setAction(e.target.value)}>
                        <span className="margin10-right font14">Action:</span>
                        <span className="margin10-right font14">
                            <input
                                type="radio"
                                name="action"
                                value="inc"
                                className="margin5-right " />
                                Increase

                        </span>
                        <span className="font14">
                            <input
                                type="radio"
                                name="action"
                                value="dec"
                                className="margin5-right"
                            />
                            Decrease
                        </span>
                    </div>
                </li>
                <li>
                    <button
                        onClick={handleSubmit}
                        className="padd10-sides text-white bg-dark-blue border5-radius border-dark-blue no-outline">
                        Update
                    </button>
                </li>
            </ul>
        </li>
    )
}

