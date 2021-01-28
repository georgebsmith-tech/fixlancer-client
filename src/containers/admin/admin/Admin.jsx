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
import AllTransactions from '../allTransactions/AllTransactions'
import DetailedTransaction from '../detailedtransactions/DetailedTransaction'
import DetailedRatings from '../detailedRatings/DetailedRatings'
import AllRatings from '../allRatings/AllRatings'
import { Link, Route } from 'react-router-dom'
import Dashboard from "./Dashboard"
import MainNavigation from './MainNavigation'
import AllWithdrawals from '../allWithdrawals/AllWithdrawals'
import JobFee from '../settings/JobFee'
import NotFound from '../../404/NotFound'

const Admin = ({ match }) => {
    const closeTheNav = () => setNavIsOpen(false)
    const [navIsOpen, setNavIsOpen] = useState(false)
    return (
        <>
            <AdminMobileHeader openNav={() => setNavIsOpen(true)} />


            <MainNavigation
                extraClass={navIsOpen ? "slide-out" : "slide-in"}
                closeNav={closeTheNav}
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
            <Route path={`${match.url}/all-transactions`} exact strict component={AllTransactions} />
            <Route path={`${match.url}/all-transactions/:username`} exact strict component={DetailedTransaction} />
            <Route path={`${match.url}/all-ratings`} exact strict component={AllRatings} />
            <Route path={`${match.url}/all-ratings/:username`} exact strict component={DetailedRatings} />
            <Route path={`${match.url}/all-withdrawals`} component={AllWithdrawals} />
            <Route path={`${match.url}/job-fee`} component={JobFee} />
            {/* <Route exact strict>
                <NotFound header={false} />
            </Route> */}

        </>
    )

}

export default Admin