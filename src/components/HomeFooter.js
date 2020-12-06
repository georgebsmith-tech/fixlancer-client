import React from 'react'
import { Link } from 'react-router-dom'

export const HomeFooter = () => {
    return (
        <footer className="index-footer">
            <div className="padd20" style={{ marginTop: "-30px!important" }}>
                <ul className="center-text  padd20-top index-footer-nav">
                    <li className="margin20-right">
                        <Link to="" className=" text-grey font14">
                            About Us
                    </Link>
                    </li>

                    <li className="margin20-right">
                        <Link to="/how-it-works" className=" text-grey font14">
                            How it works
                    </Link>
                    </li>
                    <li className="margin20-right">
                        <Link to="" className=" text-grey font14">
                            FAQs
                    </Link>
                    </li>

                    <li className="margin20-right">
                        <Link to="" className=" text-grey font14">
                            Affiliate Programs
                    </Link>
                    </li>
                    <li className="margin20-right">
                        <Link to="" className=" text-grey font14">
                            Terms
                    </Link>
                    </li>
                    <li style={{ lineHeight: 4 }}>
                        <Link to="" className=" text-grey font14">
                            Contact Us
                    </Link>
                    </li>
                </ul>
            </div>

            <div className="center-text font13 text-grey index-copy ">
                ©2020Fixlancer. Fixlancer is a registered Trademark of Fixlancer Marketplace
        </div>


        </footer>

    )
}
