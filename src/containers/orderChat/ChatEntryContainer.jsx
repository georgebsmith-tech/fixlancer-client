import React, { useState, useRef, useEffect } from 'react'

import OfferExtraBTN from '../../components/helperComponents/OfferExtaBTN'
import { domain } from '../../helperFunctions/domain'
import socketIOClient from "socket.io-client";
import SocketIOFileUpload from 'socketio-file-upload'
const ENDPOINT = domain;
const socket = socketIOClient(ENDPOINT);
var uploader = new SocketIOFileUpload(socket);

const ChatEntryContainer = ({ show, receiver, updateChat, recipient }) => {
    console.log(receiver)
    const [progress, setPreogress] = useState(0)
    const [receiver_, _] = useState(receiver)
    const loggedUser = localStorage.getItem("username")
    const [message, setMessage] = useState("")
    const [uploadedFiles, setUploadedFiles] = useState([])


    const handleTyping = () => {
        console.log("typing")
    }
    const handleSend = () => {

        // var ajax = new XMLHttpRequest()
        // var formData = new FormData()
        // formData.append("from", loggedUser)
        // formData.append("to", receiver)
        // for (var file of uploadedFiles) {
        //     formData.append("files", file)
        // }
        // ajax.open("post", `${domain}/api/orderchats/uploads`)
        // ajax.upload.onprogress = function (e) {
        //     console.log(`loaded ${e.loaded / e.total * 100} of 100`)
        //     let per = Math.round(e.loaded / e.total * 100)
        //     setPreogress(per)
        //     ajax.onload = () => {

        //     }
        //     ajax.send(formData)
        // }

        if (!message) {
            console.log("Can't send")
            return
        }
        const body = { message, sender: localStorage.getItem("username"), receiver }

        socket.emit("order-chat", body, (resp) => {
            updateChat(resp)

        })
        setMessage("")


    }

    const handleAttachedFiles = () => {
        filesRef.current.click()
    }

    const filesRef = useRef()
    const handleFilesUploads = (e) => {
        let files = []
        for (let x of e.target.files) {
            files.push(x);
        }
        setUploadedFiles(files)

    }

    useEffect(() => {

        // uploader.listenOnInput(filesRef.current);
        // uploader.addEventListener("start", function (event) {
        //     event.file.meta = { from: loggedUser, recipient }

        // });
    }, [])

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
                            onClick={handleAttachedFiles}
                            className="fa fa-paperclip font16 margin10-right padd10 attach-btn pointer on-hover circle"></i>
                        <input

                            type="file"
                            className="invisible absolute attachment" />



                        {show && <OfferExtraBTN />}




                    </div>
                    <button

                        onClick={handleSend}
                        className="font13 send-message padd10-sides padd5-top-bottom border5-radius text-white bg-green no-outline border-green">Send</button>
                </div>
                <input
                    onChange={handleFilesUploads}
                    type="file"
                    className="hide"
                    id="files-input"

                    ref={filesRef}
                    multiple
                />

            </div>
        </div>

    )
}

export default ChatEntryContainer