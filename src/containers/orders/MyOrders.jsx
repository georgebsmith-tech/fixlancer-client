import React from "react"
import MyOrdersAndSales from './MyOrdersAndSales'
import {withRouter} from 'react-router-dom'


const MyOrders = ({ match }) => {
console.log(match)
    const state = match.params.state || "ongoing"
    return (
        <MyOrdersAndSales title="My Orders" state={state} page="orders" kind="order" />
    )
}

export default withRouter(MyOrders)