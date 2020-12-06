import React from "react"
import MyOrdersAndSales from './MyOrdersAndSales'


const MyOrders = ({ match }) => {

    const state = match.params.state || "ongoing"
    return (
        <MyOrdersAndSales title="My Orders" state={state} page="orders" kind="order" />
    )
}

export default MyOrders