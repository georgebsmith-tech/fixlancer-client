import React, { useState, useEffect } from 'react'
import Request from './Request'
import UserFooter from '../../components/UserFooter'
import UserHeader from '../../components/UserHeader'
import axios from 'axios'
import { domain } from '../../helperFunctions/domain'
import UserHeaderDesktop from '../../components/UserHeaderDesktop'




const AllRequests = () => {
    const [allRequests, setAllRequests] = useState([])

    useEffect(() => {

        async function fetchData() {
            const url = `${domain}/api/requests`
            const response = await axios.get(url)
            console.log(response.data.data)
            setAllRequests(response.data.data)
        }
        fetchData()

    }, [])

    return (
        <>
            <UserHeader />
            <UserHeaderDesktop />
            <main className="main">
                <section>
                    <h1>All Requests</h1>
                    <section class="requests border-smooth margin40-bottom">
                        <ul>
                            {allRequests.map(request => <Request
                                key={request._id}
                                request={request} />)}

                        </ul>
                    </section>
                </section>
            </main>
            <UserFooter />
        </>

    )
}

export default AllRequests