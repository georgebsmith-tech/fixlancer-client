import React, { useState } from "react"

import AllUsers from '../allUsers/AllUsers'

import AllOrders from '../allOrders/AllOrders'
import AllMessages from '../allMessages/AllMessages'
import UserBalances from '../userBalances/UserBalances'
import SendNotifications from '../notifications/SendNotifications'
import AllDisputes from '../allDisputes/AllDisputes'
import AllJobRequests from '../allJobRequests/AllJobRequests'
import AllFixes from '../allFixes/AllFixes'
import FixCategories from '../fixCategories/FixCategories'
import AdminMobileHeader from './AdminMobileHeader'

import { Link, Route } from 'react-router-dom'
import Dashboard from "./Dashboard"
import MainNavigation from './MainNavigation'

const Admin = ({ match }) => {
    console.log(match.url)
    const [meniItems, setMenuItems] = useState(["all users", "all orders", "all messages", "user balances", "send notifications", "all disputes", "all job requests", "all fixes", "fix categories"])
    const [navIsOpen, setNavIsOpen] = useState(false)
    return (
        <>
            <AdminMobileHeader openNav={() => setNavIsOpen(true)} />
            {navIsOpen &&

                <MainNavigation closeNav={() => setNavIsOpen(false)} />
            }

            <ul className="flex flex-wrap">
                <li><Link
                    className="padd10 font14 block"
                    to={`${match.url}`}>
                    Dashboard
                </Link></li>
                {
                    meniItems.map(item => <li><Link
                        className="padd10 font14 block"
                        to={`${match.url}/${item.split(" ").join("-")}`}>
                        {item}
                    </Link></li>)
                }
            </ul>
            {/* dashboard  */}

            <Route path={`${match.url}`} exact component={Dashboard} />
            <Route path={`${match.url}/all-users`} component={AllUsers} />
            <Route path={`${match.url}/all-orders`} component={AllOrders} />
            <Route path={`${match.url}/all-messages`} component={AllMessages} />
            <Route path="/admin/user-balances" component={UserBalances} />

            <Route path="/admin/send-notifications" component={SendNotifications} />
            <Route path="/admin/all-disputes" component={AllDisputes} />
            <Route path="/admin/all-job-requests" component={AllJobRequests} />
            <Route path={`${match.url}/all-fixes`} component={AllFixes} />
            <Route path={`${match.url}/fix-categories`} component={FixCategories} />

        </>
    )

}

export default Admin