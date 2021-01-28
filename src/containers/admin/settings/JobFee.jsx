import React, { useState, useEffect } from 'react';
import { AdminHeading } from '../../../components/admin/AdminHeading'
import axios from 'axios'
import { domain } from '../../../helperFunctions/domain'
import Error from '../../../components/Error'
const config = {
    headers: {
        Authorization: `Bearer ${localStorage.getItem("auth-token")}`
    }

}
const JobFee = () => {

    const [config, setConfig] = useState({})

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
                title="Job Fee"
            />
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

        </main>
    );
}

export default JobFee;

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
                                /> <span className="font16">%</span>
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
