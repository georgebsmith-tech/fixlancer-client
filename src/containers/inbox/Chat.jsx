import React from 'react'
import { getDateAndTime } from '../../helperFunctions/getDate'
import { commafy } from '../../helperFunctions/commafy'


const Chat = ({ chat }) => {

    // const orderChatsContext = React.useContext(OrderChatsContext)

    const [rejected, setRejected] = React.useState(chat.content && chat.content.accepted)
    const [accepted, setAccepted] = React.useState(chat.content && chat.content.accepted)


    const loggedUser = localStorage.getItem("username")

    const fromUser = chat.from === loggedUser
    const style = {
        chatWidth: {
            width: "72vw"
        }
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
                        className="font-small">{getDateAndTime(chat.createdAt)}
                    </small>
                </div>
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
                            {getDateAndTime(chat.createdAt)}
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