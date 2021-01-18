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
    const [orderCounts, setOrderCounts] = useState({})
   
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

            const ordersURL = `${domain}/api/sales/counts`
            const ordersResponse = await axios.get(ordersURL, config)
            setOrderCounts(ordersResponse.data)



        }
        fetchData()


    },
        [])
    const total = fixes.length
    const featured = fixes.filter(fix => fix.featured).length
    const trusted = fixes.filter(fix => fix.trusted).length
    const approved = fixes.filter(fix => fix.approved).length
    const userCounts = {
        total: users.length,
        admins: users.filter(user => user.role === "admin").length,
        sellers: users.filter(user => user.seller).length
    }
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
            <div className="bg-white padd20 margin20-top margin40-bottom" style={
                {
                    boxShadow: "-3px 3px 2px 5px #f2f2f2",
                    backgroundColor: "#f7f7f7"
                }
            }
            >
                <h2 className="font30 bold">Fixes</h2>

                <div className="dashboard-section1">
                    <SummaryCard
                        title="Total"
                        perc={100}
                        count={total}
                        state="inc"
                        color="lightblue"

                    />
                    <SummaryCard
                        title="Featured"
                        perc={(featured * 100 / total).toFixed(1)}
                        count={featured}
                        state="inc"
                        color="gold"

                    />
                    <SummaryCard
                        title="Trusted"
                        perc={(trusted * 100 / total).toFixed(1)}
                        count={trusted}
                        state="dec"
                        color="green"
                    />
                </div>

                <div className="dashboard-section2">
                    <SummaryCard
                        title="Published"
                        perc={(approved * 100 / total).toFixed(1)}
                        count={approved}
                        state="inc"
                        color="lightgreen"
                    />
                    <SummaryCard
                        title="Draft"
                        perc={((total - approved) * 100 / total).toFixed(1)}
                        count={total - approved}
                        state="dec"
                        color="red"
                    />
                </div>

            </div>
            <div className="dashboard-grid-unequal margin20-bottom bg-white" >
                <div style={{ boxShadow: "-3px 3px 2px 5px #f2f2f2" }} className="padd20">
                    <h2 className="font30 margin20-bottom bold">
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
            <div
                className="orders-and-users-grid margin30-bottom margin30-top">


                <div style={{ boxShadow: "-3px 3px 2px 5px #f2f2f2" }} className="padd20">
                    <h2 className="font30 margin20-bottom bold">
                        Orders
               </h2>
                    <div>
                        <div style={{ boxShadow: "-3px 3px 2px 5px #f2f2f2" }}>


                            <Order
                                title="Total Orders"
                                count={orderCounts.all}
                            />
                            <Order
                                title="completed Orders"
                                count={orderCounts.completed}
                            />
                            <Order
                                title="Ongoing Orders"
                                count={orderCounts.ongoing}
                            />
                            <Order
                                title="Delivered Orders"
                                count={orderCounts.delivered}
                            />
                            <Order
                                title="Cancelled Orders"
                                count={orderCounts.cancelled}
                            />
                            <Order
                                title="Disputed Orders"
                                count={orderCounts.disputed}
                            />
                        </div>

                    </div>
                </div>
                <div className="padd20">
                    <h2 className="font30 margin20-bottom bold">
                        Users
                </h2>
                    <div className="bg-white padd20" style={{ boxShadow: "-3px 3px 2px 5px #f2f2f2" }} >

                        <div className="flex-between font20 margin10-bottom" >
                            <div>Total</div>
                            <div>{userCounts.total}</div>
                        </div>
                        <div className="flex-between font20 margin10-bottom" >
                            <div>Administrators</div>
                            <div>{userCounts.admins}</div>
                        </div>
                        <div className="flex-between font20 margin10-bottom" >
                            <div>Users</div>
                            <div>{userCounts.total - userCounts.admins}</div>
                        </div>

                        <div className="flex-between font20 margin10-bottom" >
                            <div>Sellers</div>
                            <div>{userCounts.sellers}</div>
                        </div>
                    </div>
                </div>
            </div>

            <section>
                <h2 className="font30 bold">
                    Online Users
                </h2>
                <UsersList
                    // updateUsers={updateUsers}
                    users={users.filter(user => user.online)} />

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
const Order = ({ title, count }) => {
    return (
        <div className="grid2-1-6 justify-center align-center padd20 border-bottom bg-white">
            <div>
                <i className="fa fa-tasks" aria-hidden="true" style={{ fontSize: 35, color: "green" }}></i>
            </div>
            <div>
                <div className="font28 margin10-bottom">{count}</div>
                <div className="font13 upper">{title}</div>
            </div>
        </div>
    )
}