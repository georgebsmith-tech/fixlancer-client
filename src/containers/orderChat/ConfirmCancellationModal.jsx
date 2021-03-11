import React, { useRef } from 'react'
import { OrderChatsContext } from './OrderChat'
import { domain } from '../../helperFunctions/domain'

const ConfirmCancellationModal = ({ order, closeModal, setCancellationRequested }) => {
    const orderChatsContext = React.useContext(OrderChatsContext)
    const cloaseModalRef = useRef()
    console.log(orderChatsContext)
    const loggedUser = localStorage.getItem("username")


    const handleConfirmRequest = () => {
        requestCancellation()
            .then(data => {
                orderChatsContext.chats.push(data.savedChat)
                setCancellationRequested(true)
                cloaseModalRef.current.click()

            })
    }
    async function requestCancellation() {
        const body = JSON.stringify({
            order_id: order.order_id,
            username: loggedUser,
            to: order.seller === loggedUser ? order.buyer : order.seller
        })

        const response = await fetch(`${domain}/api/sales/cancellation`, {
            method: "post",
            body,
            headers: {
                "Content-Type": "application/json"
            }
        })
        const data = await response.json()
        console.log(data)
        return data
    }
    return (
        <div
            className="cancellation-modal the-modal">
            <div
                className="bg-white border-smooth" style={{ height: "fit-content", maxWidth: 500 }}>
                <header
                    className="bg-heading bold padd20 center-text margin20-bottom relative" >
                    <h2
                        className="font16">Confirm Cancellation</h2>
                    <i
                        ref={cloaseModalRef}
                        onClick={closeModal}
                        className="fa fa-close modal-close close-request-modal font15">

                    </i>

                </header>
                <div class="center-text padd20">
                    <div>
                        <button
                            onClick={handleConfirmRequest}
                            class="border-smooth padd10 padd5-top-bottom font15 bg-dark-red text-white pointer no-outline hover-red"
                            id="request-cancellation">Yes
                        Cancel</button>
                    </div>
                    <div class="font14 margin20-top">
                        When you request a mutual cancellation, your order is not cancelled immediately. The
                      {order.seller === loggedUser ? " buyer" : " seller"} is given
                    2 days to accept or decline your offer to cancel
                </div>
                </div>

            </div>
        </div>
    )
}

export default ConfirmCancellationModal;