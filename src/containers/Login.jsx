import React, { Component } from 'react'
import PageHeader from '../components/PageHeader'
import ShadowCard from '../components/helperComponents/ShadowCard'
import { Link } from 'react-router-dom'
import { Input } from '../components/form/Input'
import { domain } from '../helperFunctions/domain'
import axios from 'axios'
import { Loading } from '../components/helperComponents/Loading'


class Login extends Component {
    state = {
        username: "",
        password: "",
        loggedIn: false,
        logginError: [],
        isLoading: false
    }
    handleUsername = (e) => {
        this.setState({ username: e.target.value.trim() })
        console.log(this.state)
    }

    handlePassword = (e) => {
        this.setState({ password: e.target.value })
        console.log(this.state)
    }

    handleSubmit = async (e) => {
        this.setState({ isLoading: true })
        const url = `${domain}/api/users/login`
        const password = this.state.password
        const username = this.state.username
        const body = { username, password }
        console.log(body)

        try {


            const response = await axios.post(url, body)


            if (response.data.token) {
                localStorage.setItem("auth-token", response.data.token)
                localStorage.setItem("username", response.data.user)
                console.log(response.data)
                this.setState({ loggedIn: true })

                this.props.history.push({
                    pathname: "/dashboard"
                    , state: response.data.user
                })
            } else {
                console.log(response.data)
                this.setState({ logginError: [response.data.message] })
                this.setState({ isLoading: false })
            }
        } catch (err) {
            console.log(err)
        }


    }

    render() {
        if (this.state.loggedIn) {
            this.props.history.push("/dashboard")
        }
        return (
            <div>
                <PageHeader title={"Login to Fixlancer"} />
                <main
                    className="main bg-white">
                    <div
                        className="login-wrapper">
                        <ShadowCard>
                            {this.state.logginError.length === 0 ? "" : <div className="relative">
                                <div className="error absolute" style={{ top: 20, left: 20 }}>
                                    <i className="fa fa-exclamation-circle text-dark-red font15 margin3-right"></i>
                                    <span className="font15 text-dark-red">
                                        {this.state.logginError[0]}
                                    </span>
                                </div>
                            </div>}


                            <form>
                                <div
                                    className="padd20 margin30-top margin30-bottom">
                                    <Input
                                        text={"Username or Email"}
                                        handleChange={this.handleUsername}
                                    />
                                    <Input
                                        type={"password"}
                                        text={"Password"}
                                        handleChange={this.handlePassword} />


                                    <div
                                        className="margin10-top">
                                        <button
                                            disabled={this.state.isLoading ? true : false}
                                            className="btn full-width font16 text-white  bg-dark-blue border-dark-blue"
                                            onClick={this.handleSubmit}>{!this.state.isLoading ?
                                                "Login" :
                                                <Loading

                                                    bg="transparent"
                                                    height="20px" />
                                            }
                                        </button>
                                    </div>


                                    <div
                                        className="font13 center-text">
                                        <div
                                            className="margin30-top ">
                                            <input
                                                type="checkbox"
                                                checked
                                                onChange={() => { }}

                                            />
                                            <span> Stay logged in</span>
                                        </div>
                                        <div
                                            className="margin20-top">
                                            Forgot
                                        <Link
                                                to="/reset-password"
                                                className="text-link-with-hover">
                                                Password?
                                        </Link>
                                        </div>
                                        <div
                                            className="margin20-top">
                                            Dont have an account?
                                        <Link
                                                to="/register"
                                                className="text-link-with-hover">
                                                Register Now?
                                        </Link>
                                        </div>
                                    </div>


                                </div>
                            </form>


                        </ShadowCard>
                    </div>
                    <div
                        className="margin20-top center-text font13">Go back to
                        <Link
                            to="/" className="text-link-with-hover">Home
                        </Link>
                    </div>
                </main>

            </div>
        );
    }
}

export default Login;