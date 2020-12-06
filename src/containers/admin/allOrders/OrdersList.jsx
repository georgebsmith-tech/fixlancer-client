import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { OrderMobile, OrderDesktop } from './Order'

const OrdersList = ({ orders }) => {

    return (
        <div>
            <h2
                className="bold margin20-bottom font16 margin20-top">Showing 20 most recent
            </h2>
            <ul
                className="grid-responsive-max6 mobile">
                {
                    orders.map(order => <OrderMobile
                        order={order}
                        key={order._id}

                    />
                    )
                }
            </ul>
            <ul
                className="desktop">
                {
                    orders.map(order =>
                        <OrderDesktop
                            order={order}
                            key={order._id}
                        />)
                }
            </ul>
        </div>



    )
}

export default OrdersList;