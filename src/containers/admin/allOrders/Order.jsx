import React from 'react'
import { getDate } from '../../../helperFunctions/getDate'
import { Link } from 'react-router-dom'
import { FaClock } from 'react-icons/fa'

export const OrderMobile = ({ order }) => {
    const style = {
        title: {
            lineHeight: "1.5",
        },
        imageWrapper: {
            height: 80,
            display: "inline"
        },
        grid: {
            display: "grid",
            gridTemplateColumns: "70px auto",
            columnGap: 10
        }


    }

    return (
        <li className="padd10-sides bg-white margin10-bottom border-smooth">
            <div className="border-bottom padd10-top-bottom">
                <div
                    style={style.grid}
                    className="margin10-bottom">
                    <div style={style.imageWrapper}>
                        <img src={order.image_url} alt={`image for the ${order.title.substr(0, 45)}...`} className="object-fit" />
                    </div>
                    <div className="inline">
                        <h3 className="font14 margin10-bottom" style={style.title}>
                            <Link
                                to={`/dashboard/order-chat?oid=${order.order_id}`}
                                style={{ color: "#cd580a" }}>
                                {order.title}
                            </Link>
                        </h3>
                        <div>
                            <FaClock size="0.9rem" className="margin3-right" />
                            <span className="font11">{getDate(order.delivery_date)}</span>
                        </div>
                    </div>
                </div>
                <div
                    className="flex-between">
                    <div>
                        <i
                            className="fa fa-circle margin3-right font10">

                        </i>
                        <span className="font12">{order.buyer}</span>

                    </div>
                    <div
                        className="text-green font15">
                        <span
                            className="text-green font15">
                            ₦{order.price}
                        </span> |
                    <span
                            className="text-green font15">
                            Fee: ₦ {order.fee}
                        </span>
                    </div>

                </div>
            </div>
        </li>
    )
}


export const OrderDesktop = ({ order }) => {
    return (
        <li>

        </li>
    )
}