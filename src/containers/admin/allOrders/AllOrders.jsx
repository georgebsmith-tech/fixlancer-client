import React, { useState, useEffect } from 'react'
import OrdersList from './OrdersList'

import axios from 'axios'
import { AdminHeading } from '../../../components/admin/AdminHeading'
import { domain } from '../../../helperFunctions/domain'


const AllOrders = () => {
    const [orders, setOrders] = useState([])
    const [presentOrders, setPresentOrders] = useState([])
    const config = {
        headers: {
            Authorization: `Bearer ${localStorage.getItem("auth-token")}`
        }

    }
    useEffect(() => {
        async function fetchData() {
            const url = `${domain}/api/sales/`
            const response = await axios.get(url, config)
            const data = response.data
            console.log(data)
            setOrders(data.data)
            const presentOrders = data.data.filter(order => order.state === "ongoing")
            // console.log(presentOrders)
            setPresentOrders(presentOrders)
            // setCountOfUsersWithFixes(data.usersWithFixes)


            // setIsLoading(false)
        }
        fetchData()


    },
        [])

    return (
        <>
            <main
                className="main">
                <AdminHeading
                    title="All Orders"

                />
                <OrdersList orders={presentOrders} />
            </main>

        </>

    )
}

export default AllOrders;