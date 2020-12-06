import React from 'react'
import {Link} from 'react-router-dom'

export const HomeExtra=()=>{
    return (
        <section className="bg-white">
        <div>
            <div className="padd20-top">
                <h2 className="font18 bolder center-text">
                    AS SEEN ON:
                </h2>

            </div>
            <div className="honourable-mention-wrapper margin30-top border-bottom padd30-bottom">
                <div className="honourable-mention">
                    <Link to="">
                        <img src="../../images/disrupt.png" alt="" />
                    </Link>
                </div>
                <div className="honourable-mention">
                    <Link to="">
                        <img src="../../images/Techpoint.png" alt="" />
                    </Link>
                </div>
                <div className="honourable-mention">
                    <Link to="">
                        <img src="../../images/nairaland.png" alt="" />
                    </Link>
                </div>
            </div>
        </div>
        <div className="padd90-top padd60-bottom">

            <div className="center-text margin30-bottom">
                <i className="fas fa-shield-alt text-success font18"></i>
                <strong className="bold font18">
                    Funds Protected
                </strong>
            </div>
            <div className="font15 center-text">
                <p className="margin30-bottom line-height">
                    We monitor every transaction and have smart procedures to protect you from phishing, fraud and
                    identity
                    theft.
                </p>

                <div className="margin30-bottom">
                    <p>
                        Deposits are processed by us and Secured by:
                    </p>
                    <div style={{display: "flex",justifyContent: "center"}}>
                        <img src="./images/paystack.png" alt="" style={{width: 100}} />
                    </div>
                </div>

                <div>
                    For partnership: <a href="/" class="text-link-with-hover">Send us an Email.</a>
                </div>
            </div>
        </div>


    </section>
    )
}