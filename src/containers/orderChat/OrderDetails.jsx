import React, { useState } from 'react'
import { commafy } from '../../helperFunctions/commafy'
import { OrderChatsContext } from './OrderChat'



import { getDate } from '../../helperFunctions/getDate'
const OrderDetails = ({ order, totalMilestone, paidExtras }) => {
    const orderChatsContext = React.useContext(OrderChatsContext)
    console.log(orderChatsContext)
    const loggedUser = localStorage.getItem("username")
    const timer=orderChatsContext.timer

    return (
        <div class="border-smooth bg-white">
            <header class="bg-heading padd20 margin20-bottom">
                <h2 class=" bold font16">
                    <i class="fa fa-gift"></i>
                                        Order Details
                        </h2>
            </header>
            <div
                className="grid2-1-3 margin50-sides margin5-bottom margin5-top">
                <div
                    className="margin5-right">
                    <img
                        alt={"image for the order " + orderChatsContext.order.title} src={orderChatsContext.order.title} />
                </div>
                <div
                    className="bold font20">{orderChatsContext.order.title}
                </div>

            </div>
            {
                !timer.timeIt?  <div style={{margin: "5px 50px",borderBottom:"4px solid #e74a3b",paddingBottom: 5}}>
                                    Late
                                </div>:
                                <div class="grid4 center-text margin30-sides border-smooth padd10 timer-container">
                                    <div class="display-flex flex-column">
                                        <span class="bold font20 text-orange" id="days">
                                            {timer.days}
                                        </span>
                                        <span>DAYS</span>
                                    </div>
                                    <div class="display-flex flex-column">
                                        <span class="bold font20 text-orange" id="hours">
                                            {timer.hours}
                                        </span>
                                        <span>HOURS</span>
                                    </div>
                                    <div class="display-flex flex-column">
                                        <span class="bold font20 text-orange" id="minutes">
                                            {timer.minutes}
                                        </span>
                                        <span>MINUTES</span>
                                    </div>
                                    <div class="display-flex flex-column">
                                        <span class="bold font20 text-orange" id="seconds">
                                            {timer.seconds}
                                        </span>
                                        <span>SECONDS</span>
                                    </div>

                                </div>
            }

            <div
                className="font13 bg-white padd20">


                <div
                    className="bg-white">
                    <div
                        className="padd10 grid4 border-bottom border-top">
                        <h4>ID </h4>
                        <h4> Total</h4>
                        <h4>To Deliver</h4>
                        <h4>{order.seller === loggedUser ? "Buyer" : "Seller"}</h4>

                    </div>
                    <div
                        className="padd10 grid4">
                        <div>#{order.order_id}</div>
                        <div>₦{order.price}</div>
                        <div>{getDate(order.delivery_date)}</div>
                        <div>{order.seller === loggedUser ? order.buyer : order.seller}</div>

                    </div>

                </div>
            </div>
            <PaidExtras
                paidExtras={paidExtras}
            />
            {
                (order.hasStarted && order.price >= 10000) ?
                    <div
                        className="border-top padd20-sides padd20-bottom">
                        <div
                            className="padd10 border-green padd10-top  bg-green 
                                            zero-opacity
                                            border5-radius milestone-success">
                            <div
                                className="font14 text-white">
                                Milestone released successfully.
                                    </div>

                        </div>
                        <h2
                            className="bold font16">
                            Milestone
                        </h2>
                        <div>
                            {
                                totalMilestone > 0 ?
                                    <div
                                        className=" font15 margin10-top">
                                        <i
                                            className="fa fa-check text-green">

                                        </i>
                                        <span>
                                            Milestone released:

                                            ₦<span
                                                className="milestone-present">
                                                {commafy(totalMilestone.toFixed(2))}</span>

                                        </span>

                                    </div> :
                                    <div
                                        className=" font15 margin10-top no-miles">
                                        No milestones released yet.

                                    </div>
                            }




                        </div>
                        {


                            !(orderChatsContext.milestonesCount === 3) && <Milestones />
                        }



                    </div>
                    :
                    ""
            }

        </div>
    )
}

function Milestones() {
    const [milestoneRelease, setMilestoneRelease] = useState("")
    const [isEmpty, setIsempty] = useState(false)
    const [isValidPerc, setIsValidPerc] = useState(false)
    const orderChatsContext = React.useContext(OrderChatsContext)



    const handleMilestonePerc = (e) => { setMilestoneRelease(e.target.value) }

    const handleSubmit = (e) => {
        e.preventDefault()
        setIsempty(false)
        setIsValidPerc(false)
        if (!milestoneRelease) {
            setIsempty(true)
            return
        }
        else setIsempty(false)

        if (milestoneRelease && (milestoneRelease * 1 <= 0 || milestoneRelease * 1 > 10)) {
            setIsValidPerc(true)
            return
        }
        else setIsValidPerc(false)
        releaaseMilestone()
            .then(data => {
                // console.log(data)
                orderChatsContext.setOrder(data.order)
                orderChatsContext.setMilestonesCount(orderChatsContext.milestonesCount + 1)
            })



    }
    async function releaaseMilestone() {
        const body = JSON.stringify({
            percent: milestoneRelease * 1,
            seller: orderChatsContext.order.seller,
            order_id: orderChatsContext.order.order_id
        })


        const response = await fetch(`/api/milestones`, {
            method: "post",
            body,
            headers: {
                "Content-Type": "application/json"
            }
        })
        const data = await response.json()
        return data

    }
    return (
        <form>
            <div
                className="milestone-form-container">

                <p
                    className="font11 margin10-top">
                    Enter the amount in percentage you want to
                    release to the seller
            </p>
                <div
                    className="relative">
                    <input
                        onChange={handleMilestonePerc}
                        value={milestoneRelease.trim()}
                        type="number"
                        placeholder="Enter percent e.g 10"

                        className="padd10 font15 border-smooth block margin10-top no-outline full-width"
                        style={(isEmpty || isValidPerc) ? { border: "1px solid red" } : { border: "1px solid #ddd" }}
                    />
                    <div
                        className={`milestone-error ${!isEmpty && "invisible"}`}>
                        <i
                            className="fa fa-exclamation text-red font10">

                        </i>
                        <small
                            className="text-red font10">
                            Field cannot be empty.
                        </small>
                    </div>
                    <div
                        className={`milestone-error ${!isValidPerc && "invisible"}`}>
                        <i
                            className="fa fa-exclamation text-red font10">

                        </i>
                        <small
                            className="text-red font10">
                            Percentage must be greter than 0 and at most 10.
                    </small>
                    </div>
                </div>

                <div
                    className="font12 margin20-top ">
                    <p>
                        <small>
                            * Milestones released cannot be refunded
                                                </small>

                    </p>
                    <p
                        className="margin5-top">
                        <small>
                            * It must not be higher than 10%
                     </small>
                    </p>

                </div>
                <div
                    className="margin20-top">
                    <button
                        type="submit"
                        onClick={handleSubmit}
                        className="text-white button-green padd10 full-width release-milestone">
                        Release
                    </button>
                </div>
            </div>
        </form>
    )
}


function PaidExtras({ paidExtras }) {

    return (
        <div className="margin30-sides margin20-top">
            {
                paidExtras.map(extra =>
                    <div
                        className="flex-between border-smooth padd10 padd5-top-bottom margin10-bottom bg-grey">
                        <div
                            className="font15">
                            {extra.content.description}
                        </div>
                        <div
                            className="font15">
                            ₦{commafy(extra.content.price)}
                        </div>

                    </div>)
            }

        </div>
    )
}


export default OrderDetails