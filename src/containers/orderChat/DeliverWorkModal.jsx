import React, { useState } from 'react'
import { OrderChatsContext } from "./OrderChat"
import { domain } from '../../helperFunctions/domain'
const loggedUser = localStorage.getItem("username")
const DeliverWorkModal = () => {

    const orderChatsContext = React.useContext(OrderChatsContext)
    const [uploadedFiles, setUploadedFiles] = useState([])
    const [messageError, setMessageError] = useState(false)
    const [filesError, setFilesError] = useState(false)
    const [message, setMessage] = useState("")
    const [progress, setPreogress] = useState(0)
    const handleFilesUploads = (e) => {
        let files = []
        for (let x of e.target.files) {
            files.push(x);
        }
        setUploadedFiles(files)
    }

    const handleSubmit = () => {
        setMessageError(false)
        setFilesError(false)
        if (!message) {
            setMessageError(true)
            return
        }
        if (uploadedFiles.length === 0) {
            setFilesError(true)

            return
        }
        // var ajax = new XMLHttpRequest()
        var formData = new FormData()
        formData.append("message", message)
        formData.append("from", loggedUser)
        formData.append("to", orderChatsContext.order.buyer)
        formData.append("order_id", orderChatsContext.order.order_id)
        for (var file of uploadedFiles) {
            formData.append("files", file)
        }
        // console.log(formData)
        // for (let x of formData.keys()) {
        //     console.log(x)
        // }
        fetch(`${domain}/api/orderchats/uploads`, {
            method: "post",
            body: formData
        })
            .then(resp => resp.json())
            .then(data => {
                orderChatsContext.setDeliverWorkModalIsOpen(false)
                console.log(data)

            })

        // ajax.open("post", `${domain}/api/orderchats/uploads`)
        // ajax.upload.onprogress = function (e) {
        //     console.log(`loaded ${e.loaded / e.total * 100} of 100`)
        //     let per = Math.round(e.loaded / e.total * 100)
        //     setPreogress(per)
        //     ajax.onload = () => {
        //     }
        //     ajax.send(formData)
        // }
    }
    return (
        <div class="delivery-modal the-modal">
            <div class="bg-white border-smooth full-width"
                style={
                    {
                        height: "fit-content",
                        maxWidth: 500
                    }
                }>
                <header
                    className="flex-between bg-heading padd10">
                    <div
                        className="font16 bold">
                        <i class="fa fa-gift"></i>
                        <span>Deliver Work</span>

                    </div>
                    <div>
                        <i
                            onClick={() => orderChatsContext.setDeliverWorkModalIsOpen(false)}
                            className="fa fa-close modal-close font15"></i>
                    </div>
                </header>
                <div
                    className="padd20">
                    <div
                        className="font12 margin10-top margin20-bottom caution">
                        <i
                            className="fa fa-exclamation-circle"></i>
                        <span> Sharing contact details is strictly not allowed here</span>
                    </div>
                    <div>
                        <fieldset>
                            <textarea
                                value={message}
                                onChange={
                                    (e) => setMessage(e.target.value)
                                }
                                name=""
                                id="delivery-message"
                                cols="30"
                                rows="5"
                                placeholder="Type in your delivery mmessage, explaining the content being delivered..."></textarea>
                        </fieldset>
                    </div>
                    <div
                        className={`delivery-message-error ${!messageError && "hide"}`}>
                        <i
                            className="fa fa-exclamation-circle font14 text-red margin5-right"></i>
                        <small
                            className="font14 text-red">Message field can not be empty</small>
                    </div>
                    <div className="flex-start flex-wrap ">
                        <input
                            onChange={handleFilesUploads}
                            type="file"
                            id="files"

                            className="padd10 padd5-top-bottom border-smooth margin5-top margin5-right font12"
                            multiple
                            accept=".doc, .docx,.mp4, .fiv, .psd, .ai,.wav,.mpg,.mov,.wmv,.txt,.png,.gif,.jpg,.jpeg,.ppt,.pdf,.xls,.xlsx" />

                    </div>
                    <div
                        className={`delivery-file-upload-error margin10-top ${!filesError && "hide"}`}>
                        <i
                            className="fa fa-exclamation-circle font14 text-red margin5-right"></i>
                        <small
                            className="font14 text-red">A file must be uploaded</small>
                    </div>


                    <div>
                        <ul
                            className="delivery-file-list font14 padd10-top">
                            {
                                uploadedFiles.map((file, index) => <li key={index}>{file.name}</li>)
                            }

                        </ul>
                    </div>
                    <div className="padd10-top hide upload-progress">
                        <span className="font15">Delivering Order...</span>
                    </div>
                    <div className="padd10-top hide upload-success">
                        <i className="fa fa-check text-green font15"></i>
                        <span className="font15">Order Delivered...</span>
                    </div>
                    {
                        progress > 0 && <div>
                            <progress
                                id="progressBar"
                                value={progress} max="100" style={{ width: 300 }} ></progress>
                        </div>
                    }

                    <div>
                        <button
                            onClick={handleSubmit}
                            className="margin20-top bg-green text-white center-text border-grren font16 padd10-sides padd5-top-bottom border-radius5 margin10-bottom no-outline send-delivery">
                            Deliver Work
                    </button>
                    </div>
                </div>
            </div>

        </div>


    )
}

export default DeliverWorkModal;