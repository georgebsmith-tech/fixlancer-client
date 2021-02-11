import React, { useState } from 'react'
import { domain } from '../../helperFunctions/domain'
import socketIOClient from "socket.io-client";
const ENDPOINT = domain;
const socket = socketIOClient(ENDPOINT);
const ContactSellerModal = ({ closeModal, receiver }) => {
    const sender = localStorage.getItem("username")

    const [message, setMessage] = useState("")

    const handleSubmit = () => {
        socket.emit("chat", { message, receiver, sender })
        setMessage("")
        closeModal()
    }
    return (
        <div className="modal">
            <div
                style={{ justifyContent: "center", alignItems: "center" }}
                className="full-width flex">
                <div className="modal-content border-smooth">
                    <header className="modal-header">
                        <div className="flex-between">
                            <div>
                                <i className="fa fa-comments font16" style={{ margin: "0px 5px 0px 10px" }}></i><span
                                    className="font15 bold">Contact Seller</span>
                            </div>
                            <div>
                                <i
                                    onClick={closeModal}
                                    className="fa fa-close font16"></i>
                            </div>

                        </div>
                    </header>
                    <div className="modal-body padd20">
                        <div className="font15">
                            Note: Sharing of contact details is not allowed e.g Phone Number, Whatsapp, Email
                    </div>
                        <div>
                            <textarea
                                value={message}
                                onChange={(e) => setMessage(e.target.value)}
                                id="" cols="30" rows="6" className="border-smooth chat-message"
                                placeholder="Explain the services you want done..."></textarea>

                            <div style={{ display: "flex", justifyContent: "flex-end" }}>
                                <button
                                    onClick={handleSubmit}
                                    className="button font15 send-chat-btn">Send</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}


export default ContactSellerModal;