import React from 'react'
import { AdminHeading } from '../../../components/admin/AdminHeading'



const NotificationForm = () => {
    return (
        <li className="border-bottom padd20-bottom">
            <fieldset>
                <input type="text" placeholder="URL" />

            </fieldset>
            <fieldset>
                <textarea cols="2" placeholder="Enter Your Message...">

                </textarea>
            </fieldset>
            <fieldset>
                <button className="full-width">
                    Send
               </button>
            </fieldset>
        </li>
    )
}

export default NotificationForm