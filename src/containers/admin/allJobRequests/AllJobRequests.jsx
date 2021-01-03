import React, { useState, useEffect } from 'react'
import RequestList from './RequestsList'
import { domain } from '../../../helperFunctions/domain'
import axios from 'axios'
import { Link } from 'react-router-dom'
import queryString from 'query-string'


const AllJobRequests = ({ location }) => {
    const [requests, setRequests] = useState([])
    const [allRequests, setAllRequests] = useState([])

    const qs = queryString.parse(location.search)
    console.log(qs)
    const [state, setState] = useState(qs.state || "all")
    useEffect(() => {
        async function fetchData() {
            const url = `${domain}/api/requests/admin`
            const response = await axios.get(url)
            console.log(response.data)
            setAllRequests(response.data)

        }
        fetchData()
    }, [])
    useEffect(() => {
        async function fetchData() {
            const url = `${domain}/api/requests/admin${location.search}`
            const response = await axios.get(url)
            console.log(response.data)
            setRequests(response.data)
            setState(qs.state || "all")
        }
        fetchData()
    }, [location.search])
    const counts = {
        all: allRequests.length,
        pending: allRequests.filter(request => (!request.approved && !request.declined)).length,
        declined: allRequests.filter(request => (!request.approved && request.declined)).length,
        published: allRequests.filter(request => (request.approved && !request.declined)).length
    }
    // console.log(counts)
    return (
        <>
            <Header state={state} counts={counts} />
            <RequestList requests={requests} />
        </>
    )
}

const Header = ({ counts = { all: 0, published: 0, pending: 0, declined: 0 }, state }) => <header
    className="sales-and-orders-headings">
    <div>
        <Link
            to={`/admin/all-job-requests`}
            className={state === "all" ? "active" : undefined}
        >All (<span>{counts.all}</span>)
        </Link>
    </div>
    <div>
        <Link
            to={`/admin/all-job-requests?state=published`}
            className={state === "published" ? "active" : undefined}>Published (<span>{counts.published}</span>)
         </Link>
    </div>
    <div><Link to={`/admin/all-job-requests?state=pending`}
        className={state === "pending" ? "active" : undefined}>Pending (<span>{counts.pending}</span>)</Link>
    </div>
    <div><Link to={`/admin/all-job-requests?state=declined`}
        className={state === "declined" ? "active" : undefined}>Declined (<span>{counts.declined}</span>)</Link>
    </div>
</header>

export default AllJobRequests;