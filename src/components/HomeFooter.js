import React from "react"
import { Link } from 'react-router-dom'

export const HomeFooter = () => {
    return (
        <footer className="relative footer-main" style={{ zIndex: 10 }}>
            <section className="page-padding">
                <nav
                    className="footer-section-holder2"
                >
                    <div>
                        <h3 style={{ fontSize: 18, marginBottom: 15 }} className="bold">
                            Company
                    </h3>
                        <ul>
                            <li>
                                <Link to="/about"
                                    className="font13 padd5-top-bottom block">About Us</Link>
                            </li>
                            <li>
                                <Link to="/how-it-works"
                                    className="font13 padd5-top-bottom block">How it works</Link>
                            </li>
                            <li>
                                <Link to="#"
                                    className="font13 padd5-top-bottom block">FAQs</Link>
                            </li>

                            <li>
                                <Link to="#"
                                    className="font13 padd5-top-bottom block">Affiliate Programs</Link>
                            </li>
                            <li>
                                <Link to="#"
                                    className="font13 padd5-top-bottom block">Contact Us</Link>
                            </li>
                        </ul>

                    </div>


                    <div>
                        <h3
                            className="bold"
                            style={{ fontSize: 18, marginBottom: 15 }}>
                            Connect
                    </h3>
                        <ul>

                            <li>
                                <a href="https://www.facebook.com/fixlancerM"
                                    target="_blank"
                                    className="font14 padd5-top-bottom block">Facebook</a>
                            </li>
                            <li>
                                <a href="https://www.instagram.com/fixlancer"
                                    target="_blank" className="font14 padd5-top-bottom block">Instagram</a>
                            </li>
                            <li>
                                <a href="https://www.twitter.com/fixlancerM"
                                    target="_blank" className="font14 padd5-top-bottom block">Twitter</a>
                            </li>

                        </ul>

                    </div>
                    <div>
                        <h3
                            className="bold"
                            style={{ fontSize: 18, marginBottom: 15 }}>
                            Legal
                    </h3>
                        <ul>
                            <li>
                                <Link to="#"
                                    className="font13 padd5-top-bottom block">Terms and Conditions</Link>
                            </li>


                        </ul>

                    </div>

                </nav>

            </section>
            <div className="center-text padd10 copy">
                <strong className="font14">&copy;2021 Fixcrow Market Place </strong>
            </div>
        </footer>
    )
}

