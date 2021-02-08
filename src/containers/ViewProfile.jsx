import React, { useState, useEffect } from 'react'
import UserHeader from '../components/UserHeader'
import UserFooter from '../components/UserFooter'
import UserProfile from '../components/UserProfile'
import SubHeading from '../components/helperComponents/SubHeading'
import UserFixes from "../components/fixes/FeaturedFixesList"
import HorinzontalScroll from '../components/helperComponents/HorinzontalScroll'
import axios from 'axios'
import { domain } from '../helperFunctions/domain'
import { Loading } from '../components/helperComponents/Loading'

import socketIOClient from "socket.io-client"
import ContactSellerModal from '../components/chats/ContactSeller'
import { DataLayerContext } from '../context/DataLayer'
import UserHeaderDesktop from '../components/UserHeaderDesktop'
import GuestUserHeaderDesktop from '../components/GuestUserHeaderDesktop'
import GuestUserHeader from '../components/GuestUserHeader'

const ViewProfile = (props) => {
    const [state, dispatch] = React.useContext(DataLayerContext)
    const socket = socketIOClient("http://localhost:4000")
    socket.emit("new-user", { name: "Smith" })
    console.log(socket)
    window.scrollTo(0, 0)

    const username = props.match.params.username
    const [user, setUser] = useState({})
    const [fixes, setFixes] = useState([])
    const [contactSellerModalIsOpen, setContactSellerModalIsOpen] = useState(false)
    const [isLoading, setIsloading] = useState(true)
    useEffect(() => {
        async function fetchData() {
            if (state.user.username !== username) {
                const url_of_user_info = `${domain}/api/users/${username}?content=full`
                const response1 = await axios.get(url_of_user_info, {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem("auth-token")}`
                    }
                })
                setUser(response1.data.data)

                const url_of_user_fix = `${domain}/api/fixes/${username}`
                const response2 = await axios.get(url_of_user_fix)
                console.log(response2.data.data)
                setFixes(response2.data.data)

            } else {
                setUser(state.user)
                setFixes(state.userFixes)
            }


            setIsloading(false)
        }
        fetchData()

    }, [props.match.params.username])

    return (
        <>
            {
                localStorage.getItem("isAuth") ? <> <UserHeader />
                    <UserHeaderDesktop /></> : <> <GuestUserHeaderDesktop />
                        <GuestUserHeader />
                    </>
            }
            <main>

                {isLoading ?
                    <Loading
                        height="90vh"

                    /> :
                    <UserProfile user={user}
                        openContactSellerModal={() => setContactSellerModalIsOpen(true)}
                    />}




                <section className="profile-about">
                    <div className="about-item">
                        <h2 className="about-title">About</h2>
                        <div className="profile-bio">
                            No bio yet
            </div>
                    </div>
                </section>
                <section className="margin20-top margin30-bottom">
                    <SubHeading heading={`Fixes by ${username}`} />
                    <HorinzontalScroll>
                        <UserFixes fixes={fixes} />
                    </HorinzontalScroll>


                </section>


            </main>
            {
                contactSellerModalIsOpen && <ContactSellerModal closeModal={() => setContactSellerModalIsOpen(false)} />
            }

            <UserFooter />

        </>
    )
}

export default ViewProfile;