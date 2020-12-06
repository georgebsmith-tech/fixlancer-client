import React from 'react'
import {Link} from 'react-router-dom'
import {getDate} from '../../helperFunctions/getDate'
import {commafy} from "../../helperFunctions/commafy"

const DesktopOrder=({order,kind})=>{
    let href;
    if (kind === "sale") {
        href = `/dashboard/order-chat?oid=${order.order_id}`
    } else if (order.hasStarted) {
        href = `/dashboard/order-chat?oid=${order.order_id}`
    } else {
        href = `/dashboard/order-requirements?fixid=${order.slug}&oid=${order.order_id}`
    }
   


    return (
        <li className="font14 grid-table padd20-top padd10-bottom border-bottom padd10-sides">
        <div className="flex align-center"><span className="user-avatar margin5-right"
                 style={{backgroundColor:order.sellerColor}}>{order.seller[0].toUpperCase()}</span>{order.seller === order.loggedUser ? order.buyer : order.seller}
        </div>
        <div className="flex">
            <Link to={href} className="flex"
                style={{width: 40,height: 30,overflow: "hidden",marginRight: 10}}><img
                    src={order.image_url}  alt={"image of the fix: "+ order.title.substr(0, 50) + '...'} />
            </Link>

            <Link to={href} className=" text-orange hover-underline">{order.title}</Link>
        </div>
        <div className="flex">{getDate(order.startedAt)}</div>
        <div className="flex"> ₦{commafy(order.price)}</div>
    </li>
    )
}

export default DesktopOrder;