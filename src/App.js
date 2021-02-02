import React, { useState } from 'react';
import { Route, Switch } from 'react-router-dom'
import Home from './containers/Home'
import Login from './containers/Login'
import Reset from './containers/Reset'
import Registration from './containers/Registration'
import Dashboard from './containers/dashboard/Dashboard'
import CreateFix from './containers/CreateFix'
import NotFound from './containers/404/NotFound'
import Inbox from './containers/inbox/Inbox'

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
import ViewProfile from './containers/ViewProfile'
import SendNotifications from './containers/admin/notifications/SendNotifications'
import Admin from './containers/admin/admin/Admin'

import ProtectedRoute from './components/ProtectedRoute/ProtectedRoute'
import UnProtectedRoute from './components/ProtectedRoute/UnProtectedRoute'

function App() {
  const [isAuth, setIsAuth] = useState(localStorage.getItem("isAuth"))
  const handleAuth = (state) => {
    console.log(state)
    localStorage.setItem("isAuth", true)
    setIsAuth(state)
  }

  return (
    <div>
      <Switch>
        <Route
          path="/" exact
          render={() => <Home isAuth={isAuth} />}
        />

        <Route path="/login"
          render={() => <Login handleAuth={handleAuth} />}
        />
        <Route path="/register" component={Registration} />
        <Route path="/how-it-works/" component={HowItWorks} />
        <Route path="/reset-password" component={Reset} />
        <Route path="/dashboard/finance/withdraw" component={Withdraw} />
        <ProtectedRoute
          isAuth={isAuth}
          path="/dashboard"
          exact component={Dashboard} />
        <Route path="/dashboard/create-a-fix" component={CreateFix} />
        <ProtectedRoute
          isAuth={isAuth}
          path="/dashboard/edit-fix"
          component={EditFix} />
        <ProtectedRoute
          isAuth={isAuth}
          path="/dashboard/edit" component={EditProfile} />
        <Route path="/u/:username" component={ViewProfile} />
        <Route path="/dashboard/finance/notices" component={Notices} />
        <ProtectedRoute
          isAuth={isAuth}
        path="/dashboard/inbox" 
        component={Inbox} />
        <Route path="/dashboard/finance/transactions" component={TransactionHistory} />
        <Route path="/dashboard/finance" exact component={Finance} />
        <Route path="/dashboard/pay-for-extra" component={PayForExtra} />
        <Route path="/featured" component={Featured} />
        <Route path="/fix/:subCatSlug/:titleSlug" component={DetailedFix} />
        <Route path="/order-fix/:slug" component={OrderFix} />
        <Route path="/dashboard/order-chat" component={OrderChat} />
        <Route path="/dashboard/order-requirements" component={OrderRequirements} />
        <ProtectedRoute
          isAuth={isAuth}
           path="/dashboard/my-sales" exact component={MySales} />
        <ProtectedRoute
          isAuth={isAuth} path="/dashboard/my-orders" component={MyOrders} />
        <ProtectedRoute
          isAuth={isAuth} path="/dashboard/my-requests" component={MyRequests} />
        <ProtectedRoute
          isAuth={isAuth} path="/dashboard/post-job-request" component={PostJobRequest} />
        <ProtectedRoute
          isAuth={isAuth} path="/dashboard/job-requests" component={AllRequests} />
        <Route path="/dashboard/affiliate" component={Affiliate} />
        <ProtectedRoute
          isAuth={isAuth} path="/dashboard/:slug" component={RequestOffers} />
        <Route path="/search-fix" component={SearchFix} />
        <Route path="/section/:slug" component={Section} />


        {/* Admin Routes */}
        <Route path="/admin" component={Admin} />


        <Route component={NotFound} exact strict />

      </Switch>
    </div>
  );
}

export default App;
