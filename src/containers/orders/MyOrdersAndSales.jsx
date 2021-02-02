import React, { useState, useEffect } from 'react';
import MobileOrder from './MobileOrder'
import DesktopOrder from './DesktopOrder'
import UserFooter from '../../components/UserFooter'
import UserHeader from '../../components/UserHeader'
import axios from 'axios'
import { domain } from '../../helperFunctions/domain'
import { Link } from 'react-router-dom'
import { Loading } from '../../components/helperComponents/Loading'
import UserHeaderDesktop from '../../components/UserHeaderDesktop';

const MyOrders = ({ title, page, kind }) => {
    // console.log(props)
    const orderState = "ongoing"
    console.log(orderState)
    console.log(page)
    const [state, setState] = useState(orderState)
    const [orders, setOrders] = useState([])
    const [orderCounts, setOrderCounts] = useState({ ongoing: 0, delivered: 0, cancelled: 0, completed: 0 })
    const [isLoading, setIsloading] = useState(true)
    const loggedUser = localStorage.getItem("username")
    useEffect(() => {

        async function fetchData() {
            const url = `${domain}/api/sales/${loggedUser}?type=${page}&state=${state}`
            const response = await axios.get(url)
            console.log(response.data)
            setOrders(response.data.orders)
            setOrderCounts(response.data.orderCounts)
            setIsloading(false)
        }
        fetchData()

    }, [state])
    let loading = <div
        style={{ width: "100%", height: "100vh" }} className="bg-white font20 flex-center">
        Loading...
    </div>
    const changeState = (state) => {

        setState(state)
        setIsloading(true)
    }


    return (
        <>
            <UserHeader />
            <UserHeaderDesktop />
            <main className="main">
                <section>
                    <h1>{title}</h1>
                    <section class="orders-and-sales">
                        <header class="sales-and-orders-headings">
                            <div>
                                <Link
                                    to={`/dashboard/my-${page}`} className={state === "ongoing" ? "active" : undefined}
                                    onClick={() => changeState("ongoing")}>Ongoing(<span>{orderCounts.ongoing}</span>)
                                </Link>
                            </div>
                            <div><Link to={`/dashboard/my-${page}/delivered`} onClick={() => changeState("delivered")}
                                className={state === "delivered" ? "active" : undefined}>Delivered(<span>{orderCounts.delivered}</span>)</Link>
                            </div>
                            <div><Link to={`/dashboard/my-${page}/completed`} onClick={() => changeState("completed")}
                                className={state === "completed" ? "active" : undefined}>Completed(<span>{orderCounts.completed}</span>)</Link>
                            </div>
                            <div><Link to={`/dashboard/my-${page}/cancelled`} onClick={() => changeState("cancelled")}
                                className={state === "cancelled" ? "active" : undefined}>Cancelled(<span>{orderCounts.cancelled}</span>)</Link>
                            </div>
                        </header>
                        <section class="bg-white desktop">
                            <div class="grid-table padd10 border-bottom">
                                <h3>SELLER</h3>
                                <h3>FIX</h3>
                                <h3>STARTED</h3>
                                <h3>AMOUNT</h3>
                            </div>
                            {orders.map(order =>
                                <DesktopOrder order={order} kind={"order"} key={order._id}

                                />)}
                        </section>

                        {isLoading ? < Loading height={"300px"} /> :

                            <div class="mobile grid-responsive-max3">
                                {orders.length === 0 ?
                                    <div class="padd30 center-text mobile font16 bg-white">
                                        <div class="padd30 bold">
                                            No Orders
                            </div>

                                    </div>
                                    : orders.map(order =>
                                        <MobileOrder order={order} kind={kind} key={order._id}

                                        />)}

                            </div>
                        }
                    </section>

                </section>

            </main>
            <UserFooter />
        </>
    )
}

export default MyOrders