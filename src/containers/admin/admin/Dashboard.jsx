import React, { useState, useEffect } from 'react'
import SummaryCard from './SummaryCard'
import { domain } from "../../../helperFunctions/domain"
import UsersList from '../../admin/allUsers/UsersList'
import axios from 'axios'
const config = {
    headers: {
        Authorization: `Bearer ${localStorage.getItem("auth-token")}`
    }

}

const Dashboard = () => {
    const [users, setUsers] = useState([])
    const [fixes, setFixes] = useState([])
    const [requests, setRequests] = useState([])
    useEffect(() => {
        async function fetchData() {
            const usersURL = `${domain}/api/users`
            const response = await axios.get(usersURL, config)
            const data = response.data
            setUsers(data.users)

            const fixesURL = `${domain}/api/fixes`
            const fixesResponse = await axios.get(fixesURL, config)
            console.log(fixesResponse.data)
            setFixes(fixesResponse.data.data)


            const jobsURL = `${domain}/api/requests`
            const jobsResponse = await axios.get(jobsURL, config)
            setRequests(jobsResponse.data.data)
            console.log(jobsResponse.data)


        }
        fetchData()


    },
        [])
    const total = fixes.length
    const featured = fixes.filter(fix => fix.featured).length
    const trusted = fixes.filter(fix => fix.trusted).length
    const approved = fixes.filter(fix => fix.approved).length
    const requestsCounts = {
        total: requests.length,
        published: requests.filter(req => req.approved).length,
        declined: requests.filter(req => (!req.approved && req.declined)).length,
        pending: requests.filter(req => (!req.approved && !req.declined)).length,
        open: requests.filter(req => (req.status === "Open")).length,
        closed: requests.filter(req => (req.status === "closed")).length

    }

    return (
        <main className="main">
            <div className="bg-white padd20 margin20-top margin40-bottom" style={{ boxShadow: "-3px 3px 2px 5px #f2f2f2", backgroundColor: "#f7f7f7" }}>
                <h2 className="font30">Fixes</h2>

                <div className="dashboard-section1">
                    <SummaryCard
                        title="Total"
                        perc={100}
                        count={total}
                        state="inc"

                    />
                    <SummaryCard
                        title="Featured"
                        perc={(featured * 100 / total).toFixed(1)}
                        count={featured}
                        state="inc"

                    />
                    <SummaryCard
                        title="Trusted"
                        perc={(trusted * 100 / total).toFixed(1)}
                        count={trusted}
                        state="dec"
                    />
                </div>

                <div className="dashboard-section2">
                    <SummaryCard
                        title="Published"
                        perc={(approved * 100 / total).toFixed(1)}
                        count={approved}
                        state="inc"

                    />
                    <SummaryCard
                        title="Draft"
                        perc={((total - approved) * 100 / total).toFixed(1)}
                        count={total - approved}
                        state="dec"
                    />
                </div>

            </div>
            <div className="dashboard-grid-unequal margin20-bottom" >
                <div style={{ boxShadow: "-3px 3px 2px 5px #f2f2f2" }} className="padd20">
                    <h2 className="font30 margin10-bottom bold">
                        Jobs
               </h2>
                    <Job
                        title="Total"
                        perc={100}
                        count={requestsCounts.total}
                        color="green" />
                    <Job
                        title="Published"
                        perc={(requestsCounts.published * 100 / requestsCounts.total).toFixed(1)}
                        count={requestsCounts.published}
                        color="gold" />

                    <Job
                        title="Draft"
                        perc={(requestsCounts.declined * 100 / requestsCounts.total).toFixed(1)}
                        count={requestsCounts.declined} />
                    <Job
                        title="Pending"
                        perc={(requestsCounts.pending * 100 / requestsCounts.total).toFixed(1)}
                        count={requestsCounts.pending}
                        color="yellow" />


                    <Job
                        title="Open"
                        perc={(requestsCounts.open * 100 / requestsCounts.total).toFixed(1)}
                        count={requestsCounts.open}
                        color="green" />
                    <Job
                        title="Closed"
                        perc={(requestsCounts.closed * 100 / requestsCounts.total).toFixed(1)}
                        count={requestsCounts.closed}
                        color="red" />


                </div>
                <div style={{ boxShadow: "-3px 3px 2px 5px #f2f2f2" }}></div>

            </div>

            <section>
                <h3 className="font20">
                    Recent Users
                </h3>
                <UsersList
                    // updateUsers={updateUsers}
                    users={users} />

            </section>


        </main>
    )
}

export default Dashboard;


const Job = ({ title, count = 0, perc = 0, color = "orange" }) => {
    return (
        <li className="padd20-bottom border-bottom">
            <div className="flex-between font20 margin20-bottom">
                <div className="bold">
                    {title}

                </div>
                <div className="bold font20">
                    {count} ({perc}%)
                         </div>
            </div>
            <div>
                <div
                    className="flex-between">
                    <div style={{
                        height: 5, backgroundColor: color, width: `${perc}%`, boxShadow: "0px 6px 16px 1px " + color
                    }}></div>
                    <div style={{ height: 5, backgroundColor: "#f2f2f2", width: `${100 - perc}%` }}></div>
                </div>

            </div>
        </li>
    )
}