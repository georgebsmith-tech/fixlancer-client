import React from 'react';
import { getDate } from '../../helperFunctions/getDate'
import { commafy } from '../../helperFunctions/commafy'
import { Link } from 'react-router-dom'

const MobileOrder = ({ order, kind }) => {
    let href;
    const loggedUser = localStorage.getItem("username")


    if (kind === "sale") {
        href = `/dashboard/order-chat?oid=${order.order_id}`
    } else if (order.hasStarted) {
        href = `/dashboard/order-chat?oid=${order.order_id}`
    } else {
        href = `/dashboard/order-requirements?fixid=${order.slug}&oid=${order.order_id}`
    }

    return (
        <li>
            <div className="padd30 bg-white" style={{ display: "grid", gridTemplateColumns: "75px auto", gridTemplateRows: "70px auto", columnGap: 20 }}>
                <div style={{ width: 80, height: 80 }}>
                    <Link to={href}>


                        <img src={order.image_url} alt={"image of fix " + order.title} className="border-smooth object-fit " />
                    </Link>
                </div>
                <div >
                    <h2 className="margin10-bottom ">
                        <Link to={href} className="font14 text-orange hover-underline">
                            {order.title}
                        </Link>

                    </h2>
                    <div className="font13 margin10-bottom">
                        <i className="fa fa-circle margin3-right"></i>
                        <span>{order.seller === loggedUser ? order.buyer : order.seller}</span>
                    </div>
                    <div className="flex-between">
                        <div className="font12">
                            <i className="fa fa-calender" aria-hidden="true"></i>
                            <span> {getDate(order.startedAt)}</span>
                        </div>
                        <div className="text-green font16">
                            ₦{commafy(order.price)}
                        </div>

                    </div>
                </div>

            </div>
            <div className="padd50-sides">
                <div className=" border-bottom"></div>
            </div>

        </li>
    )
}

export default MobileOrder;