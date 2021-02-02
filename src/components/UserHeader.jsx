import React, { Component } from 'react'
import { Link, withRouter, } from 'react-router-dom'
import axios from 'axios'
import { domain } from '../helperFunctions/domain'
import { getDate } from '../helperFunctions/getDate'
import { commafy } from '../helperFunctions/commafy'
import Modal from './Modal'

class UserHeader extends Component {
    state = {
        searchTerm: "",
        user: { summary: [[1, 0], [1, 0], [1, 0], [3, 0]] },
        showProfile: false,
        showRequests: false,
        showNav: false,
        searchError: false,
        isAdmin: localStorage.getItem("role") === "admin" ? true : false,
        accModalIsopen: false,
        bankDetails: {},
        detailsFormIsVissible: false,
        senderAccName: "",
        amountSent: ""
    }
    config = {
        headers: {
            Authorization: `Bearer ${localStorage.getItem("auth-token")}`
        }
    }

    handleInput = (e) => {
        this.setState({ searchTerm: e.target.value.trim() })
        console.log(this.state)
    }
    handleSearch = () => {
        if (!this.state.searchTerm) {
            this.setState({ searchError: true })
            return

        }

        this.setState({ searchError: false })
        console.log(this.props.history)
        this.props.history.push(`/search-fix?term=${this.state.searchTerm}&pg=1`)

    }

    componentDidMount = async () => {
        const username = localStorage.getItem("username")



        try {
            console.log("here in cdm")
            console.log(username)
            console.log(localStorage)
            const response = await axios.get(`${domain}/api/users/${username}`, this.config)
            const bankResponse = await axios.get(`${domain}/api/gateway`, this.config)
            // console.log()
            this.setState({ user: response.data.data, bankDetails: bankResponse.data })
            console.log(response.data.data)
        } catch (err) {
            console.log("Somthing wen wrong")

        }



    }
    handlelogOut = (e) => {
        e.preventDefault()
        localStorage.clear()

        this.props.history.push("/")



    }
    toggleProfile = () => {
        this.setState((prevState) => ({ showProfile: !prevState.showProfile }))

    }
    toggleRequest = () => {
        this.setState((prevState) => ({ showRequests: !prevState.showRequests }))

    }
    closeAllToggle = () => {
        //  this.setState((prevState)=>{
        //      if(prevState.showProfile){
        //          return {showProfile:false}
        //      }
        //  })
    }

    handleShowNav = () => {
        this.setState((prevState) => ({ showNav: !prevState.showNav }))
    }

    handleDetailsSubmission = (e) => {
        e.preventDefault()
        console.log("Clicked")

    }
    render() {
        console.log(this.state)
        const style = {
            chopbarIMG: {
                width: 30,
                height: "100%",
                borderRadius: 10,
                marginRight: 7,


            }
        }
        return (
            <>
                { this.state.accModalIsopen && <Modal
                    closeModal={() => this.setState({ accModalIsopen: false })}
                    title="Deposit Funds">
                    <div className="font16 center-text padd20">
                        <div className="margin20-bottom">
                            <span>Account Name:</span> <span>{this.state.bankDetails.accName}</span>
                        </div>
                        <div className="margin20-bottom">
                            <span>Account Number:</span> <span className="bold"> {this.state.bankDetails.accNumber}</span>
                        </div>
                        <div className="margin20-bottom">
                            <span>Bank:</span> <span>{this.state.bankDetails.bank}</span>
                        </div>
                        <div className="margin20-bottom">
                            <span>Minimum Deposit:</span> <span className="bold">₦{commafy(this.state.bankDetails.minAmount)}</span>
                        </div>
                        {
                            !this.state.detailsFormIsVissible && <div>
                                <button
                                    onClick={() => this.setState({ detailsFormIsVissible: true })}
                                    className="padd10 font16">
                                    I've Made payment
                            </button>
                            </div>
                        }

                        {this.state.detailsFormIsVissible &&
                            <form action="" className="margin40-top">
                                <p className="font16">
                                    Fill the form below so we can process your deposit
                                </p>
                                <div className="margin10-bottom margin10-top">
                                    <input
                                        value={this.state.senderAccName}
                                        className="padd10 font16 border-smooth full-width"
                                        type="text" placeholder="Full Name on Bank Account"
                                        required />
                                </div>
                                <div className="margin10-bottom">
                                    <input
                                        value={this.state.amountSent}
                                        className="padd10 font16 border-smooth full-width"
                                        type="number" placeholder="Amount Paid"
                                        required />
                                </div>
                                <div>
                                    <button
                                        onClick={this.handleDetailsSubmission}
                                        className="padd10 font16 text-white bg-green full-width border5-radius border-green">
                                        Submit
                            </button>
                                </div>
                            </form>}
                    </div>

                </Modal>}
                <header
                    className="mobile"
                    onClick={this.closeAllToggle}>
                    <nav className={`padd15 ${!this.state.showNav && 'hide'}`}>
                        <div
                            className="flex-between"
                            style={{ borderBottom: "1px solid #ddd" }}>
                            <div className="flex align-center padd10-bottom">
                                <img src="https://www.fixlancer.com/wp-content/themes/fixFIX/cb.png" alt="Buy chopbarh Image"
                                    style={style.chopbarIMG} />
                                <span className="font16">Buy Chopbarh
                                Vouchers
                        </span>
                            </div>
                            <div>
                                <i
                                    onClick={this.handleShowNav}
                                    className="fa fa-close modal-close font18"></i>
                            </div>
                        </div>
                        <div>
                            <div className="logo-maxi-container">

                                <img src="../../images/logo.png" alt="" />
                            </div>
                            <div className="mobile-finance mobile">
                                <Link className="block button header-top-btn" to="/dashboard/finance">

                                    <span className="font16 text-orange">Balance:</span>
                                    <span className="font16 text-orange">{this.state.user.summary[1][1].toFixed(2)}</span>
                                </Link>
                                <div>
                                    <button
                                        onClick={() => this.setState({ accModalIsopen: true })}
                                        className="button header-top-btn font16">Deposit Funds</button>

                                </div>
                            </div>

                        </div>
                        <ul className="mobile-nav-container">
                            <li>
                                <Link to="/dashboard">Home</Link>
                            </li>
                            <li>
                                <Link to="#" className="drop-down-profile" onClick={this.toggleProfile}>Profiie <i className="fa fa-caret-down"></i>
                                </Link>
                                {this.state.showProfile && <ul className={"drop-down-container drop-profile "}>
                                    <li><Link to={`/u/${this.state.user.username}`} className="drop">View Profile</Link></li>
                                    <li><Link to="/dashboard/edit" className="drop">Edit Profile</Link></li>
                                </ul>

                                }

                            </li>
                            <li>
                                <Link to="#" className="drop-down-requests" onClick={this.toggleRequest}>Job Request <i className="fa fa-caret-down"></i></Link>
                                {
                                    this.state.showRequests && <ul className="drop-down-container drop-requests">
                                        <li><a href="/dashboard/post-job-request" className="drop">Post a Request</a></li>
                                        <li><a href="/dashboard/my-requests" className="drop">My Requests</a></li>
                                        {this.state.user.seller &&
                                            <li><a href="/dashboard/job-requests" className="drop">All Requests</a></li>

                                        }

                                    </ul>
                                }
                            </li>
                            <li>
                                <Link to="/dashboard/my-sales">Sales ({this.state.user.summary[2][1]})<span className="header-ongoing-sales"></span></Link>
                            </li>
                            <li>
                                <a href="/dashboard/my-orders">Orders ({this.state.user.summary[3][1]}) <span className="header-ongoing-orders"></span></a>
                            </li>
                            <li>
                                <Link to="/dashboard/create-a-fix">Start Selling </Link>
                            </li>
                            <li>
                                <Link to="/dashboard/affiliate">Affiliate </Link>
                            </li>
                            {
                                this.state.isAdmin && <li>
                                    <Link to="/admin">Admin Panel </Link>
                                </li>
                            }




                            <li>
                                <Link
                                    onClick={this.handlelogOut}
                                    to="/" className="mobile-log-out">Log Out </Link>
                            </li>



                        </ul>


                    </nav>

                    <div className="flex-between padd15 shadow-bottom margin20-bottom">
                        <div>
                            <div className="">
                                <Link to="/dashboard">
                                    <img
                                        src="../../images/logo1.png"
                                        style={{ width: 45 }} />
                                </Link>
                            </div>
                        </div>
                        <div>
                            <ul className="flex align-center">
                                <li className="margin20-right relative">

                                    <input

                                        type="text" placeholder="Search" className={`no-outline border-smooth padd10-sides padd5-top-bottom font14 ${this.state.searchError && 'border-red'}`} onChange={this.handleInput} />
                                    {
                                        this.state.searchError && <div className="font12 absolute"
                                            style={{ bottom: -14 }}>
                                            <i className="fa fa-exclamation text-red margin3-right"></i>
                                            <span className="text-red">search field can not be empty</span>

                                        </div>
                                    }

                                    <i
                                        className="fa fa-search absolute font14 padd10 pointer"
                                        style={{ right: 0, top: -2 }}
                                        onClick={this.handleSearch}>

                                    </i>
                                </li>
                                <li className="margin20-right">
                                    <Link to="/dashboard/inbox">


                                        <i className="fa fa-envelope font18"></i>
                                    </Link>
                                </li>
                                <li className="margin20-right">
                                    <Link to="/dashboard/finance/notices">


                                        <i className="fa fa-bell font18"></i>
                                    </Link>
                                </li>
                                <li>
                                    <div
                                        className={`toggle-nav ${this.state.showNav ? "invisible" : "visible"}`}
                                        style={{ position: "relative", top: 0 }}
                                        onClick={this.handleShowNav}>
                                        <div></div>
                                        <div></div>
                                        <div></div>
                                    </div>
                                </li>
                            </ul>
                        </div>
                    </div>
                </header>
            </>
        );
    }
}

export default withRouter(UserHeader);