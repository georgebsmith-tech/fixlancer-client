import React, { useState, useEffect } from 'react'
import OrdersList from './OrdersList'

import axios from 'axios'
import { AdminHeading } from '../../../components/admin/AdminHeading'
import { domain } from '../../../helperFunctions/domain'
import { Link } from "react-router-dom"
import queryString from "query-string"


const AllOrders = ({ location }) => {
    const [orders, setOrders] = useState([])
    const [presentOrders, setPresentOrders] = useState([])
    const [state, setState] = useState("ongoing")
    const [counts, setCounts] = useState({ ongoing: 0, delivered: 0, cancelled: 0, completed: 0 })
    const qs = queryString.parse(location.search)
    const config = {
        headers: {
            Authorization: `Bearer ${localStorage.getItem("auth-token")}`
        }

    }
    useEffect(() => {
        async function fetchData() {

            const url = `${domain}/api/sales/counts`
            const response = await axios.get(url, config)
            const data = response.data
            console.log(data)
            setCounts(data)

        }
        fetchData()



    },
        [])
    useEffect(() => {
        async function fetchData() {

            const theState = qs.state || "ongoing"
            setState(theState)
            const url = `${domain}/api/sales?state=${theState}`
            const response = await axios.get(url, config)
            const data = response.data
            console.log(data)
            setOrders(data.data)
            // const presentOrders = data.data.filter(order => order.state === "ongoing")
            setPresentOrders(data.data)




            // console.log(presentOrders)

            // setCountOfUsersWithFixes(data.usersWithFixes)


            // setIsLoading(false)
        }
        fetchData()


    },
        [location.search])


    return (
        <>
            <main
                className="main">
                <AdminHeading
                    title="All Orders"
                />
                <Header state={state} orderCounts={counts} />
                <OrdersList orders={presentOrders} />
            </main>

        </>

    )
}


const Header = ({ orderCounts = { ongoing: 0, delivered: 0, cancelled: 0, completed: 0 }, state }) => <header class="sales-and-orders-headings">
    <div>
        <Link
            to={`/admin/all-orders`} className={state === "ongoing" ? "active" : undefined}
        >Ongoing(<span>{orderCounts.ongoing}</span>)
                                </Link>
    </div>
    <div><Link to={`/admin/all-orders?state=delivered`}
        className={state === "delivered" ? "active" : undefined}>Delivered(<span>{orderCounts.delivered}</span>)</Link>
    </div>
    <div><Link to={`/admin/all-orders?state=completed`}
        className={state === "completed" ? "active" : undefined}>Completed(<span>{orderCounts.completed}</span>)</Link>
    </div>
    <div><Link to={`/admin/all-orders?state=cancelled`}
        className={state === "cancelled" ? "active" : undefined}>Cancelled(<span>{orderCounts.cancelled}</span>)</Link>
    </div>
</header>

export default AllOrders;