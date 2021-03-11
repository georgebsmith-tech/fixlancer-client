import React, { useState, useEffect, createContext } from 'react'
import UserFooter from '../../components/UserFooter'
import UserHeader from '../../components/UserHeader'
import { getDate } from '../../helperFunctions/getDate'
import OrderDetails from './OrderDetails'
import Dispute from './Dispute'
import { Loading } from '../../components/helperComponents/Loading'
import axios from 'axios'
import { domain } from '../../helperFunctions/domain'
import ChatEntryContainer from './ChatEntryContainer'
import ExtraModal from './ExtraModal'

import ConfirmCancellationModal from './ConfirmCancellationModal'
import DisputeModal from './DisputeModal'
import DeliverWorkModal from './DeliverWorkModal'

import Chats from './Chats'
import ChatStatus from '../../components/chats/ChatStatus'
import { Link, withRouter } from 'react-router-dom'
import UserHeaderDesktop from '../../components/UserHeaderDesktop'



// import socketIOClient from "socket.io-client"

export const OrderChatsContext = createContext()

const OrderChat = ({ location }) => {

    const loggedUser = localStorage.getItem("username")
    // const socket = socketIOClient(domain + "/")

    const search = location.search.substr(1)
    const [cancellationRequested, setCancellationRequested] = useState(false)
    const [deliverWorkModalIsOpen, setDeliverWorkModalIsOpen] = useState(false)
    const [requestCancellationModalIsOpen, setRequestCancellationModalIsOpen] = useState(false)
    const [disputeModalIsOpen, setDisputeModalIsOpen] = useState(false)
    const [order, setOrder] = useState({ hasStarted: true, delivery_date: new Date() })
    const [chats, setChats] = useState([])
    const [isLoading, setIsloading] = useState(true)
    const [requirements, setRequirements] = useState({ content: {} })
    const [paidExtras, setPaidextras] = useState([])
    const [recipient, setrecipient] = useState("")
    const [totalMilestone, setTotalMilestone] = useState(0)
    const [milestonesCount, setMilestonesCount] = useState(0)
    const [extraModalIsOpen, setExtraModalIsOpen] = useState(false)
    const [disputeMessage, setDisputeMessage] = useState("")
    const [timer, setTimer] = useState({})
    const [requirementIsOpen, setRequirementIsOpen] = useState(false)

    //  socket.emit("meet", { name: loggedUser })

    let requestCancelation = <div className="margin10-right">
        <button
            onClick={() => setRequestCancellationModalIsOpen(true)}
            className="request-cancellation margin10-top bg-dark-red text-white center-text border-dark-red font12 padd10-sides padd5-top-bottom border-radius5 margin10-bottom no-outline">
            Request Cancellation
                </button>
    </div>
    let deliverWord = <div>
        <button
            onClick={() => setDeliverWorkModalIsOpen(true)}
            className="request-delivery margin10-top bg-green text-white center-text border-grren font12 padd10-sides padd5-top-bottom border-radius5 margin10-bottom no-outline">
            Deliver Work
                </button>
    </div>
    let orderPlaced = <div className="font16 bg-white padd10 margin10-bottom border-smooth bold text-orange">
        Order placed-{getDate(order.createdAt)}
    </div>

    let requiremnetsContainer = <div className="margin10-bottom border-smooth margin10-top">


        <div className="flex-between font16 bold padd10   requirements-toggle pointer">
            <div>Requirements</div>
            <i

                onClick={() => setRequirementIsOpen(!requirementIsOpen)}
                className={`fa fa-angle-${requirementIsOpen ? "up" : "down"} block padd5`}></i>
        </div>
        <div
            style={{ display: requirementIsOpen ? "block" : "none" }}
            className="bg-white line-height padd10 font13">
            <div>
                {requirements && requirements.content.requirements}
            </div>
            <div
                className="margin10-top">
                <h4 className="bold">Attachment:</h4>
                {
                    (requirements && requirements.content.fileName) ?

                        <a
                            href={`/api/download/${requirements && requirements.content.fileName}`}
                            download>
                            <span>
                                {requirements.content.fileName}
                            </span>
                            <i
                                title="Download Requirements"
                                className="fa fa-download" aria-hidden="true">

                            </i>
                        </a> :
                        <div>
                            No attachment.
                 </div>
                }
            </div>
        </div>
    </div>
    useEffect(() => {
        window.scrollTo(0, 0)
        async function fetchData() {

            const url = `${domain}/api/orderchats/complete?user=${localStorage.getItem("username")}&${search}`
            const response = await axios.get(url)
            const data = response.data
            console.log(data)
            setOrder(data.order)
            setChats(data.chats)
            setTotalMilestone(data.totalMilestone)
            setRequirements(data.requirements)
            setPaidextras(data.paidExtras)
            setrecipient(data.recipient)
            setMilestonesCount(data.milestonesCount)
            setTimer(data.timer)
            setIsloading(false)
        }
        fetchData()

    }, [location.search])

    const handleCloseRequestModal = () => {
        setRequestCancellationModalIsOpen(false)
    }
    const handleSkipRequirements = () => {
        fetch(`${domain}/api/requirements?skip=true`, {
            method: "post",
            body: JSON.stringify({ order_id: order.order_id }),
            headers: {
                "Content-Type": "application/json"
            }

        })
            .then(resp => resp.json())
            .then(data => {
                console.log(data)
                setOrder(data.sale)
            })

    }
    var countDownDate = new Date(order.delivery_date).getTime();

    // useEffect(() => {
    //   const timer=setTimeout(() => {
    //     calculateTimeLeft();
    //     // setYear(new Date().getFullYear());
    //   }, 1000);
    //   // Clear timeout if the component is unmounted
    //   return () => clearTimeout(timer);
    // });
    // const calculateTimeLeft = () => {
    //    let delivery= new Date(order.delivery_date).getTime()
    //    let now = new Date().getTime()
    //     let difference = delivery-now
    //     let time = {timeIt:timer.timeIt};

    //     if (difference > 0) {
    //       time = {
    //           ...time,
    //         days: Math.floor(difference / (1000 * 60 * 60 * 24)),
    //         hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
    //         minutes: Math.floor((difference / 1000 / 60) % 60),
    //         seconds: Math.floor((difference / 1000) % 60)
    //     };
    //   }else{
    //       setTimer({timeIt:false})
    //       return
    //   }

    //  setTimer(time);

    // }

    return (
        <>
            <OrderChatsContext.Provider value={
                {
                    chats,
                    requestCancellationModalIsOpen,
                    order,
                    setOrder,
                    milestonesCount,
                    setMilestonesCount,
                    extraModalIsOpen,
                    setExtraModalIsOpen,
                    chats,
                    setChats,
                    disputeModalIsOpen,
                    setDisputeModalIsOpen,
                    disputeMessage,
                    setDisputeMessage,
                    setDeliverWorkModalIsOpen,
                    timer,

                }} >
                <UserHeader />
                <UserHeaderDesktop />
                {
                    isLoading ? <Loading height="80vh" /> :

                        <main
                            className="main"
                            id="main">
                            <div
                                className="flex-start">
                                {(!(order.cancellation.cancellation === "pending") || cancellationRequested) &&
                                    requestCancelation}
                                {deliverWord}
                            </div>
                            {!order.hasStarted && (isLoading ? <Loading
                                height="30px"

                            /> : orderPlaced)}
                            {(order.hasStarted && requirements) &&
                                requiremnetsContainer
                            }
                            {!order.hasStarted &&
                                <div
                                    className="font16 bg-white padd10 margin10-bottom border-smooth margin10-top">
                                    <div>
                                        Waiting for buyer's requirements.
                                     </div>
                                </div>
                            }
                            {
                                !order.hasStarted && <button
                                    onClick={handleSkipRequirements}
                                    className="margin10-bottom padd10 padd5-top-bottom border5-radius no-outline bg-green text-white border-green">Skip requirements</button>
                            }
                            {
                                order.hasStarted &&
                                <>
                                    <ChatStatus
                                        recipient={recipient}

                                    />
                                    <div
                                        className="message-container">

                                        {
                                            isLoading ?
                                                <Loading height="40px" />
                                                :


                                                <div
                                                    className="font16 bg-white padd10 bold text-orange center-text margin10-top border-smooth">
                                                    <i
                                                        className="fa fa-clock-o margin5-right" aria-hidden="true">

                                                    </i>
                        Order Started- {getDate(order.startedAt)}

                                                </div>

                                        }
                                        <Chats
                                            chats={chats}
                                        />
                                    </div>
                                    <ChatEntryContainer
                                        orderID={order.order_id}
                                        receiver={loggedUser === order.seller ? order.buyer : order.seller}
                                        show={
                                            loggedUser === order.seller
                                        }
                                    />
                                </>
                            }

                            {isLoading ? <Loading height="200px" message="Loading Order details" /> : <OrderDetails order={order} totalMilestone={totalMilestone}
                                paidExtras={paidExtras}
                            />}
                            {
                                order.hasStarted && <Dispute />
                            }
                        </main>
                }
                {/* modals */}
                {extraModalIsOpen && <ExtraModal />
                }

                {
                    requestCancellationModalIsOpen && <ConfirmCancellationModal
                        order={order}
                        closeModal={handleCloseRequestModal}
                        setCancellationRequested={setCancellationRequested}
                    />
                }
                {
                    disputeModalIsOpen && <DisputeModal
                    />
                }
                {
                    deliverWorkModalIsOpen && <DeliverWorkModal />
                }

                <UserFooter />
            </OrderChatsContext.Provider>

        </>
    )
}



export default withRouter(OrderChat)