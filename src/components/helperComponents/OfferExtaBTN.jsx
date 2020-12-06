import React from 'react'
import { OrderChatsContext } from '../../containers/orderChat/OrderChat'
const OfferExtraBTN = () => {
    const orderChatsContext = React.useContext(OrderChatsContext)


    return (
        <button
            onClick={() => orderChatsContext.setExtraModalIsOpen(true)}

            className="font13 center-text offer-extra border-light-blue border5-radius text-light-blue bg-white padd5-top-bottom padd10-sides no-outline">
            Offer Extra
        </button>
    )
}

export default OfferExtraBTN