import React, { useState, useEffect, useRef } from 'react'
import UserHeader from '../../components/UserHeader'
import UserFooter from '../../components/UserFooter'
import axios from 'axios'
import { domain } from '../../helperFunctions/domain'
import UserHeaderDesktop from '../../components/UserHeaderDesktop'

const OrderRequirements = ({ location, history }) => {

    const [order, setOrder] = useState({})
    const [orderID, setOrderID] = useState("")
    const [fileName, setFileName] = useState("No file attached")
    const buttonRef = useRef()
    const [files, setFiles] = useState({})
    const [requirements, setRequirements] = useState("")
    const [sellerRequirements, setSellerRequirements] = useState("")
    const [isLoading, setIsloadin] = useState(false)

    useEffect(() => {
        const fetchDate = async () => {
            const response = await axios.get(`${domain}/api/requirements${location.search}`, {
                headers: {
                    Authorization: 'Bearer ' + localStorage.getItem("auth-token")
                }
            })
            const data = response.data
            console.log(data)
            setOrder(data.data)
            setOrderID(data.order_id)
            setSellerRequirements(data.data.requirements)
        }
        fetchDate()
    }, [])

    const handleAttchFile = () => {
        // console.log()
        buttonRef.current.click()
    }

    const handleUploadFiles = (e) => {
        setFiles(e.target.files[0])
        setFileName(e.target.files[0].name)
        // let attachedFile;
        // if (e.target.files.length === 1) {
        //     const reader = new FileReader()
        //     reader.readAsDataURL()
        //     reader.onload = () => {
        //         attachedFile = reader.result

        //         setFiles(attachedFile)
        //         // console.log(photo3)

        //     }
        // }
    }

    const handleStartOrder = () => {


        const formData = new FormData()
        formData.append("requirements", requirements)
        formData.append("order_id", orderID)
        formData.append("file", files)
        formData.append("fileName", files.name)
        fetch(`${domain}/api/requirements`, {
            method: "post",
            body: formData

        })
            .then(response => response.json())
            .then(data => {
                console.log(data)
                history.push(`/dashboard/order-chat?oid=${orderID}`)
                // location.href = `/dashboard/order-chat?oid=${orderID}`
            })

    }
    return (
        <>
            <UserHeader />
            <UserHeaderDesktop />
            <main>
                <div
                    className="text-white bg-green font20 padd10 border-smooth margin20-top">
                    Thanks for your Order.
                 </div>
                <div className="bg-white card-shadow border-smooth margin10-top">
                    <h1 className="bg-heading padd20 bold font16" style={{ marginTop: 0 }}>
                        Requirements
            </h1>
                    <div className="padd10">


                        <header>
                            <div>
                                <div className="font15">The seller request for the following to be provided before start
                                working
                            on your order:</div>
                                <p className="bold font15 padd10">
                                    {order.requirements}

                                </p>

                            </div>
                        </header>
                        <div>
                            <fieldset>
                                <textarea
                                    onChange={(e) => setRequirements(e.target.value)}
                                    value={requirements}
                                    name="" id="requirements" cols="30" rows="5"
                                    placeholder=" Provide the neccessary requiremnts for the order. Be detailed as possible and/or attach a file....">
                                </textarea>
                            </fieldset>
                        </div>
                        <div>
                            <div
                                style={{
                                    marginBottom: -30, marginTop: -20
                                }} className="flex-start">
                                <i
                                    title="Attach file"
                                    onClick={handleAttchFile}
                                    className="fa fa-paperclip font20 attach-requirement padd20 block pointer" aria-hidden="true"
                                >

                                </i>


                            </div>
                            <div
                                className="file-name font14 margin20-top">
                                {fileName}
                            </div>
                            <input
                                onChange={handleUploadFiles}
                                ref={buttonRef}

                                type="file"
                                style={{ visibility: "hidden", height: 0 }} className="hidden-attachment" />
                        </div>
                        <div>
                            <div
                                className="font14 padd10">
                                By clicking <span className="bold">Start Order</span> i aggree the information i provided is
                        complete.
                        Any further changes may be subject to extra cost.
                    </div>
                            <div
                                className="padd10">

                                <button
                                    onClick={handleStartOrder}
                                    className="button-green full-width start-order">
                                    {isLoading ? "Sending Details" : "Start Order"}

                                </button>

                            </div>
                        </div>
                    </div>
                </div>

            </main>
            <UserFooter />

        </>
    )
}


export default OrderRequirements