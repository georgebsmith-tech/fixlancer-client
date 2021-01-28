import React, { useState, useEffect, Children } from 'react';
import { AdminHeading } from '../../../components/admin/AdminHeading'
import axios from 'axios'
import { domain } from '../../../helperFunctions/domain'
import Error from '../../../components/Error'
import Switch from "react-switch";
const config = {
    headers: {
        Authorization: `Bearer ${localStorage.getItem("auth-token")}`
    }

}
const Settings = () => {

    const [config, setConfig] = useState({})
    const [extrasAreEnabled, setExtrasAreEnabled] = useState(false)
    const [fixApprovalsEnabled, setFixApprovalsEnabled] = useState(false)

    useEffect(() => {

        async function fetchData() {
            const settingsURL = `${domain}/api/settings/job_fee`
            const response = await axios.get(settingsURL, config)
            const data = response.data
            setConfig(data.config)

            console.log(data)

        }
        fetchData()

    },
        [])


    return (
        <main className="main">
            <AdminHeading
                title="Settings"
            />
            <section className="bg-white padd20 border-smooth margin20-bottom">
                <header>
                    <h2 className="font18 margin20-bottom bold">
                        Job Fee
                </h2>
                </header>
                <div className="grid2-desktop">

                    <JobCard
                        val={config.seller}
                        updateConfig={(data) => setConfig(data.config)}
                        text="The present job fee for sellers is"
                        title="Seller"
                        state="seller"
                    />
                    <JobCard
                        val={config.deposit}
                        updateConfig={(data) => setConfig(data.config)}
                        text="The present charge per deposit is"
                        title="Deposit"
                        state="deposit"
                    />
                </div>
            </section>
            <section className="bg-white padd20 border-smooth margin20-bottom">
                <header>
                    <h2 className="font18 margin20-bottom bold">
                        Withdrawal Limit
                    </h2>
                </header>
                <WithdrawalCard />


            </section>
            <section className="bg-white padd20 border-smooth margin20-bottom">
                <header>
                    <h2 className="font18 margin20-bottom bold">
                        Extras
                    </h2>
                </header>
                <div className="bg-white border-smooth margin30-bottom card-shadow">
                    <header className="padd10 header-bg">
                        <h2 className="bold font16">
                            Vissibility
                        </h2>
                    </header>
                    <div className="padd10">
                        <div className="font16 margin10-top margin10-bottom">
                            Vissibility of extras across all fixes is currently
                                 <span className="bold">
                                {extrasAreEnabled ? " Enabled" : " Disabled"}.
                                 </span>
                        </div>

                        <div>
                            <Switch
                                checked={extrasAreEnabled}
                                onChange={() => setExtrasAreEnabled(!extrasAreEnabled)}
                            />
                        </div>
                    </div>


                </div>



            </section>
            <section className="bg-white padd20 border-smooth margin20-bottom">
                <header>
                    <h2 className="font18 margin20-bottom bold">
                        Fix
                    </h2>
                </header>
                <div className="bg-white border-smooth margin30-bottom card-shadow">
                    <header className="padd10 header-bg">
                        <h2 className="bold font16">
                            Approval
                        </h2>
                    </header>
                    <div className="padd10">
                        <div className="font16 margin10-top margin10-bottom">
                            Automatic approval of new fix is   <span className="bold">
                                {fixApprovalsEnabled ? " Enabled" : " Disabled"}.
                                 </span>. {fixApprovalsEnabled ? "  All Fixes will automatically be published without admin approval." : "  New fixes must be approved by Admin before published."}


                        </div>

                        <div>
                            <Switch
                                checked={fixApprovalsEnabled}
                                onChange={() => setFixApprovalsEnabled(!fixApprovalsEnabled)}
                            />
                        </div>
                    </div>


                </div>



            </section>

        </main>
    );
}

export default Settings;
const JobCard = ({ val, updateConfig, text, state, title }) => {
    console.log(val)
    const [error, setError] = useState("")
    const [formIsVisible, setFormIsVisible] = useState(false)
    const [perc, setPerc] = useState(val)

    const handleSubmit = (e) => {
        setError("")
        e.preventDefault()
        if (perc > 100 || perc < 0) {
            setError("Percatage must be between 0 and 100")
            return
        }

        const body = {
            value: perc * 1,
            state
        }
        const sendData = async () => {
            try {
                const response = await axios.put(`${domain}/api/settings/job_fee`, body)
                const data = response.data
                console.log(data)
                updateConfig(data)
                setFormIsVisible(false)
                setPerc("")
                window.scrollTo(0, 0)
            } catch (err) {
                console.log(err)

            }

        }


        sendData()


        console.log(body)
    }
    return (
        <section className="bg-white border-smooth margin30-bottom card-shadow">
            <header className="padd10 header-bg">
                <h2 className="bold font16">
                    {title}
                </h2>
            </header>
            <div className="padd10">
                {
                    error &&
                    <Error error={error} />


                }

                <div className="font16 margin10-bottom">
                    {text}
                    <span className="bold"> {val}%.</span>

                </div>
                {
                    !formIsVisible ? <div>
                        <button
                            onClick={() => setFormIsVisible(true)}
                            className="padd10 padd5-top-bottom border-smooth">
                            <i className="fa fa-pencil margin5-right"></i>
                    Change Fee</button>
                    </div> :
                        <form action="" className="margin20-top" onSubmit={handleSubmit}>
                            <div>
                                <input
                                    style={{ width: 240 }}
                                    value={perc}
                                    onChange={(e) => setPerc(e.target.value)}
                                    className="border-smooth padd10 font16"
                                    type="number"
                                    placeholder="Fee in percentage, E.g 12"
                                /><span className="font16">%</span>
                            </div>
                            <div className="margin20-top flex-between">
                                <button
                                    type="submit"
                                    className="padd10 padd5-top-bottom border-smooth ">

                                    Effect Change</button>
                                <button
                                    onClick={(e) => { e.preventDefault(); setFormIsVisible(false) }}
                                    className="padd10 padd5-top-bottom border-smooth bg-dark-blue text-white bd-dark-blue">

                                    Cancel</button>
                            </div>

                        </form>
                }

            </div>

        </section>

    )
}


const WithdrawalCard = ({ }) => {

    const [error, setError] = useState("")
    const [formIsVisible, setFormIsVisible] = useState(false)
    const [limit, SetLimit] = useState("")
    const [newLimit, setNewLimit] = useState("")


    useEffect(() => {
        async function fetchData() {

            const limit_url = `${domain}/api/settings/withdrawal_limit`
            const limit_data = (await axios.get(limit_url)).data
            // console.log(limit_data)
            SetLimit(limit_data.config.limit)
        }
        fetchData()
    }, [])

    const handleSubmit = (e) => {
        setError("")
        e.preventDefault()
        if (!newLimit.trim()) {
            setError("Field can't be empty.")
            return
        }
        if (newLimit < 0) {
            setError("Limit can't be negative.")
            return
        }

        const body = {
            limit: newLimit
        }
        console.log(body)

        const sendData = async () => {
            try {
                const response = await axios.put(`${domain}/api/settings/withdrawal_limit`, body)
                const data = response.data
                console.log(data)
                SetLimit(data.config.limit)
                setFormIsVisible(false)
                setNewLimit("")
                window.scrollTo(0, 0)
            } catch (err) {
                console.log(err)

            }

        }


        sendData()


        console.log(body)
    }
    return (
        <section className="bg-white border-smooth margin30-bottom card-shadow">
            <header className="padd10 header-bg">
                <h2 className="bold font16">
                    Limit
                </h2>
            </header>
            <div className="padd10">
                {
                    error &&
                    <Error error={error} />


                }

                <div className="font16 margin10-bottom">
                    Minimum amount per withdrawal is
                    <span className="bold"> ₦{limit}</span>

                </div>
                {
                    !formIsVisible ? <div>
                        <button
                            onClick={() => setFormIsVisible(true)}
                            className="padd10 padd5-top-bottom border-smooth">
                            <i className="fa fa-pencil margin5-right"></i>
                    Change Limit</button>
                    </div> :
                        <form action="" className="margin20-top" onSubmit={handleSubmit}>
                            <div>
                                <input
                                    style={{ width: 240 }}
                                    value={newLimit}
                                    onChange={(e) => setNewLimit(e.target.value)}
                                    className="border-smooth padd10 font16"
                                    type="number"
                                    placeholder="Limit"
                                />
                            </div>
                            <div className="margin20-top flex-between">
                                <button
                                    type="submit"
                                    className="padd10 padd5-top-bottom border-smooth ">

                                    Effect Change</button>
                                <button
                                    onClick={(e) => { e.preventDefault(); setFormIsVisible(false) }}
                                    className="padd10 padd5-top-bottom border-smooth bg-dark-blue text-white bd-dark-blue">

                                    Cancel</button>
                            </div>

                        </form>
                }

            </div>

        </section>

    )
}

