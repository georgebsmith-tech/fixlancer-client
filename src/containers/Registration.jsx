import React, { useState, useEffect } from 'react'
import PageHeader from '../components/PageHeader'
import ShadowCard from '../components/helperComponents/ShadowCard'
import { Input } from '../components/form/Input'
import { Link } from 'react-router-dom'
import { domain } from '../helperFunctions/domain'
import axios from 'axios'


const Registration = () => {
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [country, setCountry] = useState("Nigeria");
    const [password, setPassword] = useState("");
    const [city, setCity] = useState("");
    const [repeatPassword, setRepeatPassword] = useState("");
    const [phone, setPhone] = useState("");
    const [countyOptions, setCountyOptions] = useState([]);
    const [isLoading, setIsloading] = useState(true);
    const handleUsername = (e) => {

        setUsername(e.target.value)


    }

    const handleSubmit = (e) => {
        if (password !== repeatPassword) {
            console.log("password must match!")
            return
        }
        const body = {
            password,
            username,
            phone,
            email,
            city,
            country,
            confirm_password: repeatPassword,
            solved: true

        }
        console.log(body)
        async function fetchData() {

            const url = `${domain}/api/users`
            const response = await axios.post(url, body)
            console.log(response.data)



        }
        fetchData()
    }
    const handleEmail = (e) => {
        setEmail(e.target.value)
    }

    const handlePassword = (e) => {
        setPassword(e.target.value)
    }
    const handleRepeatpassword = (e) => {
        setRepeatPassword(e.target.value)
    }
    const handlePhone = (e) => {
        setPhone(e.target.value)
    }

    useEffect(() => {
        async function fetchData() {
            const response = await fetch("https://raw.githubusercontent.com/samayo/country-json/master/src/country-by-name.json")
            const data = await response.json()
            setCountyOptions(data.map(country => country.country));
            setIsloading(false)
        }
        fetchData()
    }, [])

    const page = (
        <div>

            <PageHeader title={"Create Account"} />
            <main className="main bg-white">
                <div className="login-wrapper">
                    <ShadowCard>


                        <div className="padd20 margin30-bottom">
                            <div className="font14 margin20-bottom">Please enter your details. We will send you a new password.</div>
                            <Input
                                value={username}
                                text={"Username"}
                                handleChange={handleUsername}
                            />
                            <Input
                                value={email}
                                text={"Email"}
                                type="email"
                                handleChange={handleEmail}
                            />
                            <select
                                onChange={(e) => setCountry(e.target.value)}
                                value={country}
                                className="padd10 no-outline border-smooth full-width margin10-top margin10-bottom font16">
                                <option value={"Nigeria"} key={"Nigeria"} >Nigeria</option>
                                {countyOptions.map(country => (<option value={country} key={country} >{country}</option>))}


                            </select>
                            <Input
                                value={city}
                                text={"City"}
                                handleChange={(e) => setCity(e.target.value)}
                            />
                            <Input
                                value={phone}
                                text={"Mobile Number"}
                                type={"tel"}
                                handleChange={handlePhone}
                            />
                            <Input
                                value={password}
                                text={"Password"}
                                type={"password"}
                                handleChange={handlePassword}
                            />
                            <Input
                                value={repeatPassword}
                                text={"Retype Password"}
                                type={"password"}
                                handleChange={handleRepeatpassword}
                            />

                            <div
                                className="margin10-top">
                                <button
                                    className="btn full-width font16 text-white bg-dark-blue border-dark-blue"
                                    onClick={handleSubmit}>Create Account
                                </button>
                            </div>
                            <div className="font13 margin20-top">
                                By clicking create account you agree to our <Link to="/terms-and-conditions">
                                    Terms & Conditions
                            </Link>

                            </div>

                        </div>


                    </ShadowCard>
                </div>
                <div className="margin20-top center-text font13">Go back to <Link to="/" className="text-link-with-hover">Home</Link> | <Link to="/login" className="text-link-with-hover">Login</Link></div>
            </main>

        </div>
    )

    return (isLoading ? <div className="flex-center font20" style={{ height: "100vh" }}>Loading...</div> : page);

}

export default Registration;