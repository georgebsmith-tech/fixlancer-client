import React from 'react';
import { Route, Switch } from 'react-router-dom'
import Home from './containers/Home'
import Login from './containers/Login'
import Reset from './containers/Reset'
import Registration from './containers/Registration'
import Dashboard from './containers/dashboard/Dashboard'
import CreateFix from './containers/CreateFix'
import NotFound from './containers/404/NotFound'
import Inbox from './containers/inbox/Inbox'
import ViewProfile from './containers/ViewProfile'
import EditProfile from './containers/editProfile/EditProfile'
import Notices from './containers/finance/Notices'
import TransactionHistory from './containers/finance/TransactionHistory'
import DetailedFix from './containers/fixDetailed/DetailedFix'
import OrderFix from './containers/orderFix/OrderFix'
import OrderChat from './containers/orderChat/OrderChat'
import OrderRequirements from './containers/OrderRequirements/OrderRequirements'
import MyOrders from './containers/orders/MyOrders'
import MySales from './containers/orders/MySales'
import PostJobRequest from './containers/requests/PostJobRequest'
import AllRequests from './containers/requests/AllRequests'
import MyRequests from './containers/requests/MyRequests'
import RequestOffers from './containers/requestOffers/RequestOffers'
import SearchFix from './containers/search/SearchFix'
import Section from './containers/FixSection/Section'
import Affiliate from './containers/affiliate/Affiliate'
import PayForExtra from './containers/payForExtra/PayForExtra'
import Featured from './containers/featured/Featured'
import Finance from './containers/finance/Finance'
import Withdraw from './containers/finance/Withdraw'
import HowItWorks from './containers/howItWorks/HowItWorks'
import EditFix from './containers/EditFix'

import AllUsers from './containers/admin/allUsers/AllUsers'
import AllOrders from './containers/admin/allOrders/AllOrders'
import AllMessages from './containers/admin/allMessages/AllMessages'
import UserBalance from './containers/admin/userBalance/UserBalance'
import SendNotifications from './containers/admin/notifications/SendNotifications'

function App() {

  return (
    <div>
      <Switch>
        <Route path="/" exact component={Home} />
        <Route path="/login" component={Login} />
        <Route path="/register" component={Registration} />
        <Route path="/how-it-works/" component={HowItWorks} />
        <Route path="/reset-password" component={Reset} />
        <Route path="/dashboard/finance/withdraw" component={Withdraw} />
        <Route path="/dashboard" exact component={Dashboard} />
        <Route path="/dashboard/create-a-fix" component={CreateFix} />
        <Route path="/dashboard/edit-fix" component={EditFix} />
        <Route path="/dashboard/edit" component={EditProfile} />
        <Route path="/u/:username" component={ViewProfile} />
        <Route path="/dashboard/finance/notices" component={Notices} />
        <Route path="/dashboard/inbox" component={Inbox} />
        <Route path="/dashboard/finance/transactions" component={TransactionHistory} />
        <Route path="/dashboard/finance" exact component={Finance} />
        <Route path="/dashboard/pay-for-extra" component={PayForExtra} />
        <Route path="/featured" component={Featured} />
        <Route path="/fix/:subCatSlug/:titleSlug" component={DetailedFix} />
        <Route path="/order-fix/:slug" component={OrderFix} />
        <Route path="/dashboard/order-chat" component={OrderChat} />
        <Route path="/dashboard/order-requirements" component={OrderRequirements} />
        <Route path="/dashboard/my-sales" exact component={MySales} />
        <Route path="/dashboard/my-orders" component={MyOrders} />
        <Route path="/dashboard/my-requests" component={MyRequests} />
        <Route path="/dashboard/post-job-request" component={PostJobRequest} />
        <Route path="/dashboard/job-requests" component={AllRequests} />
        <Route path="/dashboard/affiliate" component={Affiliate} />
        <Route path="/dashboard/:slug" component={RequestOffers} />
        <Route path="/search-fix" component={SearchFix} />
        <Route path="/section/:slug" component={Section} />

        {/* Admin Routes */}
        <Route path="/admin/all-users" component={AllUsers} />
        <Route path="/admin/all-orders" component={AllOrders} />
        <Route path="/admin/all-messages" component={AllMessages} />
        <Route path="/admin/user-balance" component={UserBalance} />
        <Route path="/admin/send-notifications" component={SendNotifications} />


        <Route component={NotFound} exact strict />

      </Switch>
    </div>
  );
}

export default App;
