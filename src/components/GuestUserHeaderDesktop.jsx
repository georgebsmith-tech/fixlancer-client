import React, { useState } from 'react';
import { Link, withRouter } from 'react-router-dom'
const GuestUserHeaderDesktop = ({ history }) => {


    const [searchTerm, setSearchTerm] = useState("")
    const [searchError, setSearchError] = useState(false)

    const search = () => {
        setSearchError(false)
        if (!searchTerm) {
            setSearchError(true)
            return

        }
        history.push(`/search-fix?term=${searchTerm}&pg=1`)
        setSearchTerm("")
    }
    const handleSearch = (e) => {

        setSearchTerm(e.target.value)
        if (e.keyCode === 13) {
            search()

        }
    }




    return (
        <section className="desktop">
            <header
                style={{
                    boxShadow: "0 0.15rem 1.75rem 0 rgba(58, 59, 69, 0.15)",
                    position: "relative", zIndex: 10
                }}
                className="bg-white flex-between padd10">
                <nav>
                    <ul className="flex align-center">
                        <li>
                            <Link to="/dashboard" >
                                <img
                                    src="../../images/logo.png" alt=""
                                    style={{ width: 130 }}
                                />
                            </Link>
                        </li>

                        <li className="relative padd15">
                            <input
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                onKeyDown={handleSearch}
                                placeholder="Find services e.g logo"
                                type="text"
                                style={{ width: 350 }}
                                className="padd10 padd5-top-bottom border-smooth font15 block" />
                            {
                                searchError && <div
                                    className="font12 absolute"
                                    style={{ bottom: 0 }}>
                                    <i
                                        className="fa fa-exclamation text-red margin3-right"></i>
                                    <span
                                        className="text-red">search field can not be empty</span>

                                </div>
                            }
                            <i
                                className="fa fa-search absolute font14 padd10 pointer"
                                style={{ right: 15, top: 12 }}
                                onClick={search}>

                            </i>
                        </li>


                    </ul>

                </nav>
                <ul className="flex align-center">
                    <li className="padd20">
                        <Link to="/login" className="font14">


                            Login
                        </Link>
                    </li>
                    <li className="padd20">
                        <Link to="/register" className="font14">
                            Create Account
                        </Link>
                    </li>


                </ul>

            </header>
        </section>
    );
}

export default withRouter(GuestUserHeaderDesktop);
