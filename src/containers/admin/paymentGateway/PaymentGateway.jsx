import React, { useEffect, useState } from 'react';
import { AdminHeading } from '../../../components/admin/AdminHeading'
import axios from 'axios'
import { domain } from '../../../helperFunctions/domain'
import Error from '../../../components/Error'
const config = {
    headers: {
        Authorization: `Bearer ${localStorage.getItem("auth-token")}`
    }

}

let banks = [
    "Access Bank",
    "Citibank",
    "Diamond Bank",
    "Dynamic Standard Bank",
    "Ecobank Nigeria",
    "Fidelity Bank Nigeria",
    "First Bank of Nigeria",
    "First City Monument Bank",
    "Guaranty Trust Bank",
    "Heritage Bank Plc",
    "Jaiz Bank",
    "Keystone Bank Limited",
    "Providus Bank Plc",
    "Polaris Bank",
    "Stanbic IBTC Bank Nigeria Limited",
    "Standard Chartered Bank",
    "Sterling Bank",
    "Suntrust Bank Nigeria Limited",
    "Union Bank of Nigeria",
    "United Bank for Africa",
    "Unity Bank Plc",
    "Wema Bank",
    "Zenith Bank",
];

const PaymentGateway = () => {
    const [bank, setBank] = useState("")
    const [accName, setAccName] = useState("")
    const [accNumber, setAccNumber] = useState("")
    const [accType, setAccType] = useState("")
    const [minAmount, setMinAmount] = useState("")
    const [id, setId] = useState("")

    useEffect(() => {

        async function fetchData() {
            const settingsURL = `${domain}/api/gateway`
            const response = await axios.get(settingsURL, config)
            const data = response.data
            console.log(data)
            setAccName(data.accName)
            setAccNumber(data.accNumber)
            setBank(data.bank)
            setAccType(data.accType)
            setMinAmount(data.minAmount)
            setId(data._id)


        }
        fetchData()

    },
        [])

    const updateData = async (url, body) => {
        try {
            const response = await axios.put(url, body)
            const data = response.data
            return data
        } catch (err) {
            console.log(err)

        }

    }
    const handleUpdate = (e) => {
        e.preventDefault()
        const body = {
            accName,
            accNumber,
            accType,
            minAmount,
            bank,
            id

        }
        console.log(body)
        updateData(`${domain}/api/gateway`, body)
            .then(data => {
                console.log(data)

            })
            .catch(err => {
                console.log(err)
            })

        console.log("Update")
    }
    return (
        <main className="main">
            <AdminHeading
                title="Payment Gateway"
            />
            <div className="bg-white border-smooth margin30-bottom card-shadow">
                <header className="padd10 header-bg">
                    <h2 className="bold font16">
                        Account Details
                        </h2>
                </header>
                <div className="padd10">

                    <div>
                        <form action="">
                            <div className="margin20-bottom">
                                <label htmlFor="acc-name" className="font16 margin5-bottom block">Account Name</label>
                                <div>
                                    <input
                                        value={accName}
                                        onChange={(e) => setAccType(e.target.value)}
                                        type="text" className="font16 padd10 padd5-top-bottom border-smooth full-width" />
                                </div>
                            </div>
                            <div className="margin20-bottom">
                                <label htmlFor="acc-number" className="font16 margin5-bottom block">Account Number</label>
                                <div>
                                    <input
                                        value={accNumber}
                                        onChange={(e) => setAccNumber(e.target.value)}
                                        type="number"
                                        className="font16 padd10 padd5-top-bottom border-smooth full-width"
                                    />
                                </div>
                            </div>
                            <div className="grid2-desktop">
                                <div className="margin20-bottom">
                                    <label htmlFor="bank" className="font16 margin5-bottom block">Bank</label>
                                    <div>
                                        <select
                                            value={bank}
                                            onChange={(e) => setBank(e.target.value)}
                                            name="" id="" className="padd10 padd5-top-bottom font16 full-width border-smooth">
                                            <option value="">Select</option>
                                            {
                                                banks.map((bank, idx) => <option value={bank} key={idx}>{bank}</option>
                                                )
                                            }
                                        </select>
                                    </div>
                                </div>
                                <div className="margin20-bottom">
                                    <label htmlFor="acc-type" className="font16 margin5-bottom block">Account Type</label>
                                    <div>
                                        <select
                                            value={accType}
                                            onChange={(e) => setAccType(e.target.value)}
                                            name="" id="" className="padd10 padd5-top-bottom font16 full-width border-smooth">
                                            <option value="">Select</option>
                                            <option value="savings">Savings</option>
                                            <option value="current">Current</option>
                                            <option value="deposit">Deposit</option>
                                        </select>
                                    </div>
                                </div>

                            </div>
                            <div className="margin20-bottom">
                                <label htmlFor="acc-name" className="font16 margin5-bottom block">Minimum Deposit</label>
                                <div>
                                    <input
                                        value={minAmount}
                                        onChange={(e) => setMinAmount(e.target.value)}
                                        type="text" className="font16 padd10 padd5-top-bottom border-smooth full-width" />
                                </div>
                            </div>
                            <div className="margin20-top">
                                <button
                                    onClick={handleUpdate}
                                    className="full-width padd5 text-white bg-dark-blue border-dark-blue font16">
                                    Update
                                </button>
                            </div>

                        </form>

                    </div>
                </div>


            </div>

        </main>
    );
}

export default PaymentGateway;
