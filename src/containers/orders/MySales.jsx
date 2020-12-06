import React from "react"
import MyOrdersAndSales from './MyOrdersAndSales'


const MySales = ({ match }) => {
    const state = match.params.state || "ongoing"
    return (
        <MyOrdersAndSales title="My Sales" state={state} page="sales" kind="sale" />
    )
}

export default MySales