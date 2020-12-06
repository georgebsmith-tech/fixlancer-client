import React, { useEffect, useState } from 'react'
import { AdminHeading } from '../../../components/admin/AdminHeading'
import NotificationForm from './NotificationForm'
import { config } from '../../../helperFunctions/config'

import axios from 'axios'
import { domain } from '../../../helperFunctions/domain'


const SendNotifications = () => {
    const [isLoading, setIsLoading] = useState(true)
    const [users, setUsers] = useState([])
    useEffect(() => {
        async function fetchData() {
            const url = `${domain}/api/users`
            const response = await axios.get(url, config)
            const data = response.data
            console.log(data)
            setUsers(data.users)
            setIsLoading(false)
        }
        fetchData()


    },
        [])
    return (
        <main
            className="main">
            <AdminHeading
                title="Send Notifications"

            />
            <ul>
                {
                    users.map(user => <li className="margin5-bottom"><input type="radio" name="user" /> <span className="font15">{user.username}</span></li>)
                }
            </ul>

            <NotificationForm />
            <NotificationForm />
            <NotificationForm />
        </main>
    )
}

export default SendNotifications