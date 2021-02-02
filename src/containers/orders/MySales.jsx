import React from "react"
import MyOrdersAndSales from './MyOrdersAndSales'
import {withRouter} from 'react-router-dom'


const MySales = ({ match }) => {
    const state = match.params.state || "ongoing"
    return (
        <MyOrdersAndSales title="My Sales" state={state} page="sales" kind="sale" />
    )
}

export default withRouter(MySales)