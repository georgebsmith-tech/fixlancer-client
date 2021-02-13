import React, { useState } from 'react'

import OfferExtraBTN from './OfferExtaBTN'
import { domain } from '../../helperFunctions/domain'
import socketIOClient from "socket.io-client";
const ENDPOINT = domain;
const socket = socketIOClient(ENDPOINT);

const ChatEntryContainer = ({ show, receiver, updateChat }) => {
    const [message, setMessage] = useState("")

    const handleTyping = () => {
        console.log("typing")
    }
    const handleSend = () => {
        const body = { message, sender: localStorage.getItem("username"), receiver }

        socket.emit("chat", body, (resp) => {
            updateChat(resp)
            console.log(resp)
        })
        setMessage("")


    }

    return (

        <div
            className="bg-white padd10 padd10-bottom margin10-bottom border-smooth">
            {
                <div style={{ marginTop: -5 }} className="invisible"><em
                    className="typing-status ">{""} is typing</em>
                </div>
            }

            <div
                className="relative">
                <textarea

                    onFocus={handleTyping}
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    name="" cols="30"
                    rows="2"
                    className="fill-width padd8 outline-none border-smooth font14"
                    placeholder="Enter your message..."
                    id="message"></textarea>
                <small
                    style={
                        {
                            top: 62,
                            left: 10,
                            fontSize: "1rem"
                        }}
                    className="font12 text-red hide chat-input-error">
                    <i className="fa fa-exclamation text-red"></i>
                     Message input field can no be empty</small>
            </div>
            <div>
                <div class="flex-between margin20-top">
                    <div>
                        <i
                            className="fa fa-paperclip font16 margin10-right padd10 attach-btn"></i>
                        <input
                            type="file"
                            className="invisible absolute attachment" />



                        {show && <OfferExtraBTN />}




                    </div>
                    <button

                        onClick={handleSend}
                        className="font13 send-message padd10-sides padd5-top-bottom border5-radius text-white bg-green no-outline border-green">Send</button>
                </div>

            </div>
        </div>

    )
}

export default ChatEntryContainer