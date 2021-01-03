import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { RequestMobile, RequestDesktop } from './Request'

const RequestList = ({ requests }) => {

    return (
        <div>
            <h2
                className="bold margin20-bottom font16 margin20-top">Showing 20 most recent
            </h2>
            <ul
                className="grid-responsive-max6 mobile">
                {
                    requests.map(request => <RequestMobile
                        request={request}
                        key={request._id}

                    />
                    )
                }
            </ul>
            <ul
                className="desktop">
                {
                    requests.map(request =>
                        <RequestDesktop
                            request={request}
                            key={request._id}
                        />)
                }
            </ul>
        </div>



    )
}

export default RequestList;