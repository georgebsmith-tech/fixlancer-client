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
import NotFound from '../../404/NotFound'

const Admin = ({ match }) => {
    console.log(match.url)

    const [navIsOpen, setNavIsOpen] = useState(false)
    return (
        <>
            <AdminMobileHeader openNav={() => setNavIsOpen(true)} />


            <MainNavigation
                extraClass={navIsOpen ? "slide-out" : "slide-in"}
                closeNav={() => setNavIsOpen(false)}
            />
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
            <Route exact strict>
                <NotFound header={false} />
            </Route>

        </>
    )

}

export default Admin