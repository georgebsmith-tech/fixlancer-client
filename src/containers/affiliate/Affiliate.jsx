import React, { useState, useEffect } from "react"
import UserFooter from "../../components/UserFooter";
import UserHeader from "../../components/UserHeader";
import { affiliateTerms } from './affiliateTerms'
import axios from 'axios'
import { domain } from '../../helperFunctions/domain'
import { Loading } from "../../components/helperComponents/Loading";
const Affiliate = ({ history }) => {
    const loggedUser = localStorage.getItem("username")

    const [fullName, setFullName] = useState("")
    const [city, setCity] = useState("")
    const [phone, setPhone] = useState("")
    const [website, setWebsite] = useState("")
    const [email, setEmail] = useState("")
    const [isActive, setIsActive] = useState(false)
    const [hasApplied, setHasApplied] = useState(false)
    const [isApproved, setIsApproved] = useState(false)
    const [isLoading, setIsLoading] = useState(true)
    const style = {
        container: {
            backgroundColor: "#f7f7f7",
            padding: 10,
            marginTop: 25
        },
        header: {
            padding: "10px 20px",
            backgroundColor: "#f8f9fc",
            borderBottom: "1px solid #e3e6f0"
        },
        affiliate: {
            borderLeft: "3px solid #1cc88a"
        }
    }
    const config = {
        headers: {
            Authorization: `Bearer ${localStorage.getItem("auth-token")}`
        }

    }
    React.useEffect(() => {
        async function fetchData() {
            const url_of_affiliate_info = `${domain}/api/affiliates/${loggedUser}`
            const response = await axios.get(url_of_affiliate_info, config)
            const affiliateData = response.data
            setIsApproved(affiliateData.approved)
            setIsActive(affiliateData.active)
            setHasApplied(affiliateData.applied)
            if (!affiliateData.active) {
                const url_of_user_info = `${domain}/api/users/${loggedUser}?content=full`
                const response1 = await axios.get(url_of_user_info)
                const data = response1.data.data
                const bank = response1.data.data.bankDetails
                console.log(response1.data)
                setCity(data.city)
                setFullName(data.fullName)
                setPhone(data.phone)
                setWebsite(data.website)
                setEmail(data.email)
            }

            setIsLoading(false)
        }
        fetchData()


    },
        [])
    const handleSubmit = (e) => {
        e.preventDefault()

        const body = JSON.stringify({
            fullName,
            phone,
            city,
            website
        })
        const sendData = async () => {
            try {
                const response = await axios.post(`/api/affiliates`, body, {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem("auth-token")}`
                    }

                })
                const data = response.data
                console.log(data)
                setIsApproved(data.approved)
                setIsActive(data.active)
                setHasApplied(data.applied)



            } catch (err) {
                // console.log(Object.keys(err))
                // console.log(Object.values(err))
                if (err.response.status === 401 || err.response.status === 403) {
                    localStorage.clear()
                    history.push("/login")
                }


                console.log(err.response.status)
                console.log(err.response.data.error)
            }

        }
        sendData()
        console.log(body)
    }
    return (
        <>
            <UserHeader />
            <main>
                <h1>
                    <i
                        className="fas fa-chart-pie">

                    </i>
                    <span>Affiliate Dashboard</span>
                </h1>
                {(!isApproved && hasApplied) &&
                    <div
                        className="font13 padd10 profile-updated line-height"
                        style={{
                            marginBottom: 40,
                            marginTop: 20,
                            background: "#1cc88a",
                            borderRadius: 5
                        }}>
                        <span

                            className="text-white">Your application has been received. We will notify you when your request is accepted
                        </span>
                    </div>
                }
                {
                    !hasApplied &&

                    <div>
                        {
                            isLoading ? <Loading height="70vh" /> :

                                <form>
                                    <div style={style.container} >
                                        <div className="border-smooth bg-white">
                                            <header
                                                style={style.header} className="font16 bold">
                                                Apllication Form
                                        </header>
                                            <div
                                                className="padd20">



                                                <fieldset>
                                                    <input
                                                        onChange={(e) => setFullName(e.target.value)}
                                                        value={fullName}
                                                        type="text" placeholder="Full Name" />
                                                </fieldset>
                                                <fieldset>
                                                    <input
                                                        onChange={(e) => setCity(e.target.value)}
                                                        value={city}
                                                        type="text" placeholder="Location" />
                                                </fieldset>
                                                <fieldset>
                                                    <input
                                                        onChange={(e) => setPhone(e.target.value)}
                                                        value={phone}
                                                        type="text" placeholder="Phone" />
                                                </fieldset>
                                                <fieldset>
                                                    <input
                                                        onChange={(e) => setWebsite(e.target.value)}
                                                        value={website}
                                                        type="text" placeholder="Website (Optional)" />
                                                </fieldset>

                                                <fieldset>
                                                    <input
                                                        value={email}
                                                        type="email" placeholder="Email" disabled />
                                                </fieldset>


                                            </div>

                                        </div>
                                        <div
                                            className="margin20-top margin20-bottom font15 line-height">
                                            By applying to be an affiliate you’ve read, understood, and agreed to our Affiliate Terms below
                                 </div>
                                        <button
                                            type="submit"
                                            onClick={handleSubmit}
                                            className="full-width padd5 text-white bg-dark-blue border-dark-blue no-outline border5-radius">
                                            Apply
                                     </button>

                                    </div>
                                </form>
                        }
                    </div>
                }
                <div
                    style={style.affiliate}
                    className="border-smooth padd10 margin40-top bg-white margin20-bootom">
                    <h2
                        className="margin30-bottom font20 margin20-top"
                        style={{ color: "#36b9cc" }}>Affiliate Terms
                    </h2>
                    <ul>
                        {
                            affiliateTerms.map((term, idx) =>
                                <li
                                    key={idx}
                                    className="margin20-bottom font14">
                                    <i
                                        className="fa fa-dot-circle text-success">

                                    </i>
                                    <span>{term}</span>
                                </li>)
                        }
                    </ul>
                </div>

            </main>
            <UserFooter />
        </>
    )
}

export default Affiliate;