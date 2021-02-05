import React, { useState, useEffect } from 'react'
import Request from './Request'
import UserFooter from '../../components/UserFooter'
import UserHeader from '../../components/UserHeader'
import axios from 'axios'
import { domain } from '../../helperFunctions/domain'

import FixListMax6 from '../../components/fixes/FixListMax6'
import UserHeaderDesktop from '../../components/UserHeaderDesktop'




const MyRequests = () => {
    const [myRequests, setMyRequests] = useState([])
    const loggedUser = localStorage.getItem("username")
    const [fixes, setFixes] = useState([])
    const [isLoadingRequests, setIsLoadingRequests] = useState(true)

    useEffect(() => {

        async function fetchData() {
            const url = `${domain}/api/requests/${loggedUser}`
            const response = await axios.get(url)
            setMyRequests(response.data.data)

            const url_for_recommendations = `${domain}/api/fixes?state=random&count=6`
            const response1 = await axios.get(url_for_recommendations)

            setFixes(response1.data)
        }
        fetchData()

    }, [])
    let content = <div className="bg-white padd10 font14 border5-radius">
        No job Requests Found
</div>

    return (
        <>
            <UserHeader />
            <UserHeaderDesktop />
            <main className="main">
                <section>
                    <h1>My Job Requests</h1>
                    <section class="requests border-smooth margin40-bottom">
                        {myRequests.length === 0 ? content : <ul>
                            {myRequests.map(request => <Request key={request._id} request={request} />)}

                        </ul>
                        }
                    </section>
                </section>
                <FixListMax6 fixes={fixes} />

            </main>
            <UserFooter />
        </>

    )
}

export default MyRequests