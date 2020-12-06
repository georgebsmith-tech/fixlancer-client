import React from 'react'
import { OrderChatsContext } from './OrderChat'

const Dispute = () => {
    const orderChatsContext = React.useContext(OrderChatsContext)
    const [slideIn, setSlideIn] = React.useState(true)

    return (
        <div
            className="dispute-container">
            <div
                className="margin20-top">
                <button
                    onClick={() => setSlideIn(!slideIn)}
                    className="blocck text-white center-text padd10 bg-dark-blue bold no-outline border-dark-blue full-width dispute-order">
                    Dispute Order
                 </button>
            </div>
            <div
                className={"padd20 padd10-top dispute-hide " + (slideIn ? "dispute-slide-in" : "dispute-slide-out")}>
                <div>
                    <p>Having issues with this order?</p>
                    <p className="padd10-top">Open a dispute below, an
                    admin will come in to assist
                    </p>
                </div>
                <div className="margin40-top">
                    <fieldset>
                        <textarea
                            value={orderChatsContext.disputeMessage}
                            onChange={(e) => orderChatsContext.setDisputeMessage(e.target.value)}
                            name=""
                            id="dispute-message"
                            cols="30" rows="4"
                            placeholder="Be detailed as possible..."
                            className="font16">

                        </textarea>
                    </fieldset>
                </div>
                <div>
                    <button
                        onClick={() => orderChatsContext.setDisputeModalIsOpen(true)}
                        className="blocck text-white center-text bg-dark-blue bold no-outline border-dark-blue full-width border-smooth padd10 font16 padd5-top-bottom send-dispute">
                        Dispute
                    </button>
                </div>
            </div>
        </div>



    )
}



export default Dispute