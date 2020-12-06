import React from "react"
import { Link } from 'react-router-dom'

const UserFooter = () => {
    return (
        <footer className="main-footer relative" style={{ zIndex: 10 }}>
            <section>
                <nav className="footer-nav">
                    <ul className="footer-nav-item-container">
                        <li>
                            <Link to="#">Buy ChopBarh Vouchers</Link> |
                        </li>
                        <li>
                            <Link to="#">Start Selling</Link> |
                </li>
                        <li>
                            <Link to="/dashboard/post-job-request">Post Job Request</Link> |
                </li>
                        <li>
                            <Link to="/about">About Us</Link> |
                </li>
                        <li>
                            <Link to="/how-it-works">How it works</Link> |
                </li>
                        <li>
                            <Link to="#">FAQs</Link> |
                </li>
                        <li>
                            <Link to="#">Terms</Link> |
                </li>
                        <li>
                            <Link to="#">Affiliate Programs</Link> |
                </li>
                        <li>
                            <Link to="#">Contact Us</Link> |
                </li>
                    </ul>
                </nav>
                <div className="copy-right">
                    <strong>&copy;2020 Fixlancer Market Place </strong>
                </div>
            </section>
        </footer>
    )
}

export default UserFooter