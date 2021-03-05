import React from 'react'
import { getDateAndTime2 } from '../../helperFunctions/getDate'
import { commafy } from '../../helperFunctions/commafy'

import { OrderChatsContext } from './OrderChat'
import { Link } from 'react-router-dom'


const Chat = ({ chat }) => {
    console.log(chat)
    const orderChatsContext = React.useContext(OrderChatsContext)

    const [rejected, setRejected] = React.useState(chat.content && chat.content.accepted)
    const [accepted, setAccepted] = React.useState(chat.content && chat.content.accepted)


    // console.log(chat)



    const loggedUser = localStorage.getItem("username")
    // console.log(loggedUser)
    const fromUser = chat.from === loggedUser
    const style = {
        chatWidth: {
            width: "72vw"
        }
    }
    const orderID = orderChatsContext.order.order_id
    let sender;
    let receiver;
    if (orderChatsContext.order.seller === loggedUser) {
        sender = orderChatsContext.order.seller
        receiver = orderChatsContext.order.buyer
    } else {
        receiver = orderChatsContext.order.seller
        sender = orderChatsContext.order.buyer
    }


    const handleRejectCancellation = async () => {
        const body = JSON.stringify({
            order_id: orderID,
            username: sender,
            to: receiver,
            state: "reject",
            chatID: chat._id
        })


        const response = await fetch("/api/sales/cancellation", {
            method: "put",
            body,
            headers: {
                "Content-Type": "application/json"
            }
        })
        const data = await response.json()
        console.log(data)
        setRejected(true)
        orderChatsContext.chats.push(data.savedChat)
        return data
    }
    const acceptCancellation = async () => {

        const response = await fetch("/api/sales/cancellation", {
            method: "put",
            body: JSON.stringify({
                order_id: orderID,
                username: sender,
                to: receiver,
                state: "accept",
                chatID: chat._id
            }),
            headers: {
                "Content-Type": "application/json"
            }
        })
        const data = await response.json()
        orderChatsContext.chats.push(data.savedChat)
        return data
    }

    const chatsContent = fromUser ? "flex-end" :
        "flex-start"
    const className = `padd10 font14 margin3-bottom ${fromUser ? "message-sent" : "bg-white border-smooth message-received"}`
    let content;
    switch (chat.type) {
        case "rejected cancellation":
            content = <div>
                <div className="border-smooth margin10-top margin10-bottom padd10 "
                    style={{ backgroundColor: "#eee" }}>
                    <div
                        style={{
                            display: "grid",
                            gridTemplateColumns: "40px auto",
                            alignItems: "center"
                        }}>
                        <div
                            className="margin10-right  flex-center">
                            <i
                                className="fa fa-ban font33 text-dark-red">

                            </i>
                        </div>
                        <div>
                            <h4
                                className="bold font13 margin10-bottom">
                                Cancellation Rejected
                            </h4>

                            <span
                                className="font11">
                                Mutual cancllation of the order was rejected.
                            </span>

                        </div>
                    </div>
                </div>
                <div
                    className={`${fromUser ? "flex-end" : "flex-start"} flex-end margin5-top`}>
                    <small
                        className="font-small">{getDateAndTime2(chat.createdAt)}
                    </small>
                </div>
            </div>
            break;
        case "dispute":
            content = <div>
                <div
                    className="margin20-top margin20-sides">
                    <div
                        className="center-text bg-dispute border5-radius padd10 font14 text-orange">
                        <i
                            className="fa fa-gavel text-dark-orange" aria-hidden="true">

                        </i>
                        <span
                            className="text-dark-orange">
                            Under Dispute
                        </span>
                    </div>
                </div>
                <div
                    className="flex-end margin5-bottom margin10-top">
                    <div>
                        <div
                            className="padd10 border5-radius font13 message-sent">
                            <div
                                class="margin10-bottom">
                                {chat.message}
                            </div>
                            <div
                                className="flex-end">

                            </div>

                        </div>
                        <div
                            class="font-small italic margin5-top">
                            {getDateAndTime2(chat.createdAt)}
                        </div>
                    </div>
                </div>
            </div>


            break;
        case "extras":
            content = <div
                class="bg-">
                <h3
                    class="bold font15 margin5-bottom">
                    Extras
                </h3>
                <div
                    class="bg-white padd10 margin10-bottom border5-radius border3-left-light-blue">
                    <div class="font14">
                        <div
                            class="margin5-bottom">{chat.content.description}</div>
                        <div class="flex-between">
                            <div>
                                <span>+ {chat.content.days} days</span>
                                <span> | </span>
                                <span> ₦{commafy(chat.content.price)}</span>

                            </div>
                            <div>


                                {
                                    chat.content.paid ?
                                        <div
                                            class="padd10-sides border5-radius paid-border center-text paid-text padd5-top-bottom">
                                            <i
                                                class="fa fa-check paid-text">

                                            </i>
                                    Paid
                                </div> : <>{
                                            (orderChatsContext.order.buyer === loggedUser) &&

                                            <Link
                                                to={`/dashboard/pay-for-extra?oid=${orderChatsContext.order.order_id}&eid=${chat.extra_id}`}
                                                className="padd10-sides accept-extra no-outline padd5-top-bottom border5-radius bg-green border-green text-white"
                                            >
                                                Accept offer
                                            </Link>
                                        }</>

                                }




                            </div>

                        </div>

                    </div>

                </div>
            </div>
            break;
        case "accepted cancellation":
            content =
                <div>
                    <div
                        class="border-smooth margin10-top margin10-bottom padd10 "
                        style={{
                            backgroundColor: "#eee"
                        }
                        }>
                        <div
                            style={{
                                display: "grid",
                                gridTemplateColumns: "40px auto",
                                alignItems: "center"
                            }}>
                            <div
                                className="margin10-right circle border3-dark-red flex-center"
                                style={{ width: 30, height: 30 }}>
                                <i
                                    className="fa fa-close font18 text-dark-red">

                                </i>
                            </div>
                            <div>
                                <h4
                                    className="bold font13 margin10-bottom">
                                    Cancellation Accepted
                                </h4>

                                <span
                                    className="font11">
                                    Mutual cancllation of the order was accepted.</span>

                            </div>
                        </div>


                    </div>
                    <div class="flex-end margin5-top">
                        <small
                            className="font-small">{getDateAndTime2(chat.createdAt)}
                        </small>
                    </div>
                </div>
            break;
        case "cancellation request":
            content = <div>
                <div class="border-smooth margin10-top margin10-bottom padd10 "
                    style={{ backgroundColor: "#eee" }}>
                    <div
                        style={{
                            display: "grid", gridTemplateColumns: "40px auto",
                            alignItems: "center"
                        }}>
                        <div
                            className="margin10-right circle border3-dark-red flex-center"
                            style={{
                                width: 30,
                                height: 30
                            }}>
                            <i
                                class="fa fa-close font18 text-dark-red">

                            </i>
                        </div>
                        <div>
                            <h4 class="bold font13 margin10-bottom">Order cancellation</h4>

                            <span class="font11">
                                You have requested a mutual cancellation for this order.
                                    </span>


                            <span
                                class="font11">The Seller has requested a cancellation for this order.</span>
                        </div>
                    </div>
                    <div
                        class="flex-end margin5-top">
                        <small
                            class="font-small">{getDateAndTime2(chat.createdAt)}
                        </small>
                    </div>

                </div>
                {
                    !rejected &&

                    <div class="grid2">
                        <div class="margin10-bottom">
                            <button
                                onClick={handleRejectCancellation}
                                className="text-white bg-green no-outline border-green padd10 full-width border5-radius"
                                id="reject-cancellation">Reject</button>
                        </div>
                        <div className="margin10-bottom">
                            <button
                                className="bg-green no-outline padd10 full-width border5-radius"
                                id="accept-cancellation"
                                style={{ backgroundColor: "hsl(240, 5%, 96%)", border: "1px solid #f4f4f5" }}
                            >Accept
                            </button>
                        </div>

                    </div>
                }
            </div>
            break;
        default:
            content =
                <div className={chatsContent}>
                    <div>
                        <div className={className}>
                            {chat.message}
                        </div>
                        <em className={`margin5-top font-small italic ${fromUser ? "flex-end" : "flex-start"}`}>
                            {getDateAndTime2(chat.createdAt)}
                        </em>
                    </div>
                </div>




    }



    return (
        <li className="margin10-bottom">
            {content}
        </li>

    )
}

export default Chat