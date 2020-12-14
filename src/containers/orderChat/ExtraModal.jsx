
import React, { useState } from 'react'
import { OrderChatsContext } from './OrderChat'
import { domain } from '../../helperFunctions/domain'
import { ButtonLoader } from '../../components/helperComponents/ButtonLoader'


const ExtraModal = () => {
    const orderChatsContext = React.useContext(OrderChatsContext)
    const [extraHeading, setExtraHeading] = useState("")
    const [extrasPrice, setExtrasPrice] = useState("")
    const [extrasDays, setExtrasDays] = useState("")
    const [isValid, setIsvalid] = useState(true)
    const [isSending, setIsSending] = useState(false)

    function getExtrasBody() {
        const body = JSON.stringify({
            username: orderChatsContext.order.seller,
            to: orderChatsContext.order.buyer,
            price: extrasPrice,
            days: extrasDays,
            description: extraHeading,
            order_id: orderChatsContext.order.order_id,
            type: "extras"

        })
        return body

    }
    async function sendextra(body) {
        const response = await fetch(`${domain}/api/orderchats`, {
            method: "post",
            body,
            headers: {
                "Content-Type": "application/json"
            }
        })
        const data = await response.json()
        return data


    }
    // msgMainContainer.scrollTop = msgMainContainer.scrollHeight
    const handleSubmit = () => {
        setIsSending(true)
        if (!extraHeading || !extrasPrice || extrasDays === "-1") {
            setIsvalid(false)
            setIsSending(false)
            return

        }
        const body = getExtrasBody()
        sendextra(body)
            .then(data => {
                orderChatsContext.setChats([...orderChatsContext.chats, data.chat])
                console.log(data)
                setIsSending(false)
                orderChatsContext.setExtraModalIsOpen(false)


            })


    }


    return (

        <div className="offer-extras-modal the-modal">
            <div className="bg-white border-smooth full-width" style={{ height: "fit-content", "max-width": 500 }}>
                <header class="flex-between bg-heading padd10">
                    <div class="font16 ">
                        <i className="fa fa-gift margin5-right"></i>
                        <span class="bold">Offer Extras</span>

                    </div>
                    <div>
                        <i
                            className="fa fa-close modal-close  font15"
                            onClick={() => orderChatsContext.setExtraModalIsOpen(false)}
                        ></i>
                    </div>
                </header>
                <div class="padd20">
                    <div class="font12 margin10-top margin20-bottom line-height">
                        This is a way to offer extra services without creating a new order
                </div>
                    {
                        !isValid && <div className="font12 margin10-bottom">
                            <i
                                className="fa fa-exclamation-circle text-red margin5-right">

                            </i>
                            <small
                                className="text-red">All fields are required
                            </small>
                        </div>
                    }

                    <div>
                        <fieldset class="relative">
                            <input
                                type="text"
                                placeholder="What are you offering?"
                                className="extras-heading"
                                onChange={(e) => setExtraHeading(e.target.value)}
                                value={extraHeading}

                            />

                        </fieldset>
                    </div>
                    <div>
                        <div class="grid2">
                            <fieldset
                                className="relative">
                                <select

                                    className="bg-white extras-days"
                                    value={extrasDays}
                                    onChange={(e) => setExtrasDays(e.target.value)}
                                >
                                    <option value="-1" class="bg-white">Extra Days</option>
                                    {
                                        [1, 2, 3, 4, 5, 6, 7, 8, 10, 11].map(days =>
                                            <option
                                                value={days}
                                                key={days}>{days} days
                                            </option>)
                                    }

                                </select>

                            </fieldset>
                            <div class="relative">
                                <fieldset>
                                    <input
                                        type="number"
                                        placeholder="Extra Price"
                                        className="extras-price"
                                        onChange={(e) => setExtrasPrice(e.target.value * 1)}
                                        value={extrasPrice}

                                    />

                                </fieldset>
                            </div>

                        </div>
                    </div>

                    <div>
                        <button
                            onClick={handleSubmit}
                            className=" font14 button-green full-width">
                            {
                                !isSending ? "Send" : <ButtonLoader />
                            }


                        </button>
                    </div>
                    <div class="text-red font12 margin20-top margin20-bottom">
                        * Enter price without any comma or naira sign
                </div>
                </div>
            </div>

        </div>
    )

}

export default ExtraModal