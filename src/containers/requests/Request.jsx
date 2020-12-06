import React, { Component } from 'react';

import { commafy } from '../../helperFunctions/commafy'
import { getDate } from '../../helperFunctions/getDate'
import { Link } from 'react-router-dom'

class Request extends Component {
    state = {}
    render() {
        const loggedUser = localStorage.getItem("username")

        const style = {
            backgroundColor: this.props.request.userColor
        }

        let requestState;
        if (this.props.request.username === loggedUser && this.props.request.approved)
            requestState = <div>
                <i
                    className="fa fa-check-circle margin3-right font12"
                    style={{ color: "#33bd4b" }}>

                </i>
                <span
                    style={{ color: "#33bd4b" }}
                    className="font12">Approved
                </span>

            </div>
        else if (this.props.request.username === loggedUser && !this.props.request.approved)
            requestState = <div>
                <i className="fa fa-exclamation-triangle font12 text-red margin3-right"></i>
                <span className="font12 text-red">Not approved</span>
            </div>

        else if (this.props.request.offers.find(offer => offer.username === loggedUser))

            requestState = <div className="font13">
                <i className="fa fa-check-circle text-good margin5-right"></i>
                <span className="text-good">
                    Offer Sent
                            </span>
            </div>
        else
            requestState = <div>
                <Link className="send-offer" to={`/dashboard/${this.props.request.slug}`}>Send Offer </Link>
            </div>

        return (
            <li className="padd20 grid2-1-9 padd60-right padd0-bottom bg-white">
                <div>
                    <span className="username-icon" style={style}>{this.props.request.username[0].toUpperCase()}</span>
                </div>
                <div>
                    <h2
                    >
                        <Link
                            to={`/dashboard/${this.props.request.slug}`}
                            className="font20 text-orange margin10-bottom">
                            {this.props.request.title}

                        </Link>

                    </h2>
                    <p className="font16 line-height" style={{ wordWrap: "wrap", width: "100%" }}>
                        {this.props.request.description.substr(0, 50)}...
                    </p>
                    <div className="font12 margin10-top ">
                        <i className="fa fa-clock"></i>
                        <span> {this.props.request.delivery} days</span>
                    </div>
                    <div className="flex-between margin10-top">
                        <div className="font23 bold">₦{commafy(this.props.request.price)}</div>
                        {requestState}
                    </div>
                    <div className="margin30-top">
                        <a href="#" className="font13 text-link-with-hover"> {this.props.request.username}</a> -
                        <span className="font13"> {getDate(this.props.request.createdAt)}</span>
                    </div>
                    <div className="border-bottom margin30-top"></div>

                </div>
            </li>
        );
    }
}

export default Request;