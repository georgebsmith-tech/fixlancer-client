import React from 'react'
import { OrderChatsContext } from './OrderChat'


const loggedUser = localStorage.getItem("username")

const DisputeModal = () => {
   
    const orderChatsContext = React.useContext(OrderChatsContext)
    const receiver = orderChatsContext.order.seller === loggedUser ? orderChatsContext.order.buyer : orderChatsContext.order.seller



    async function sendMessage() {
        const content = {
            sender: loggedUser,
            receiver,
            message: orderChatsContext.disputeMessage,
            state: "sent",
            orderID: orderChatsContext.order.order_id,
            type: "dispute"
        }

        // socket.emit("order-chat", content)
        console.log(content)

    }
    // socket.on("order-chat", (data) => {
    //     console.log(data)

    // })


    return (
        <div className="confirm-dispute-modal the-modal">
            <div className="bg-white border-smooth full-width" style={{ height: "fit-content", maxWidth: 500 }}>
                <header className="flex-between bg-heading padd10">
                    <div className="font16 bold">
                        <i className="fa fa-gavel"></i>
                        <span className="bold">Create Dispute</span>

                    </div>
                    <div>
                        <i
                            onClick={() =>
                                orderChatsContext.setDisputeModalIsOpen(false)
                            }
                            className="fa fa-close modal-close font15">

                        </i>
                    </div>
                </header>
                <div className="padd20">
                    <div className="font20 margin10-top margin20-bottom center-text">
                        Are you sure you want to create Dispute?
                </div>

                    <div className="flex-between">
                        <div>
                            <button
                                onClick={() =>
                                    orderChatsContext.setDisputeModalIsOpen(false)
                                }
                                className="margin20-top bg-green text-white center-text border-grren font16 padd10-sides padd5-top-bottom border-radius5 margin10-bottom no-outline width">
                                No
                        </button>
                        </div>


                        <div>
                            <button
                                onClick={() =>
                                    sendMessage()
                                }
                                className="margin20-top   center-text  font16 padd10-sides padd5-top-bottom border-radius5 margin10-bottom no-outline border-grey bg-grey width confirm-dispute">
                                Yes
                        </button>
                        </div>
                    </div>
                </div>
            </div>

        </div>
    )
}


export default DisputeModal;