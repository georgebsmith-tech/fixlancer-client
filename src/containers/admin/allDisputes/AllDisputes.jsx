import React, { useState, useEffect } from 'react'
import OrdersList from '../allOrders/OrdersList'

import axios from 'axios'
import { AdminHeading } from '../../../components/admin/AdminHeading'
import { domain } from '../../../helperFunctions/domain'



const AllDisputes = () => {
    const [presentOrders, setPresentOrders] = useState([])
    const config = {
        headers: {
            Authorization: `Bearer ${localStorage.getItem("auth-token")}`
        }

    }

    useEffect(() => {
        async function fetchData() {


            const url = `${domain}/api/sales?state=dispute`
            const response = await axios.get(url, config)
            const data = response.data
            console.log(data)
            setPresentOrders(data.data)
        }
        fetchData()


    },
        [])


    return (
        <>
            <main
                className="main">
                <AdminHeading
                    title="All Disputes"
                />

                <OrdersList orders={presentOrders} />
            </main>

        </>

    )
}




export default AllDisputes;