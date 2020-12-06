import React, { useState, useEffect } from 'react'

import { Loading } from '../../../components/helperComponents/Loading'
import axios from 'axios'
import { AdminHeading } from '../../../components/admin/AdminHeading'
import { domain } from '../../../helperFunctions/domain'
import { config } from '../../../helperFunctions/config'
import MessagesList from './MessagesList'


const AllMessages = () => {
    const [messages, setMessages] = useState([])
    const [isLoading, setIsLoading] = useState(true)
    const [userColors, setUserColors] = useState([])
    useEffect(() => {
        async function fetchData() {
            const url = `${domain}/api/chats`
            const response = await axios.get(url, config)
            const data = response.data
            console.log(data)

            setMessages(data.chats)
            setUserColors(data.userColors)
            setIsLoading(false)
        }
        fetchData()


    },
        [])

    return (
        <>
            <main
                className="main">
                <AdminHeading
                    title="All Messages"

                />
                {
                    isLoading ? <Loading
                        message="Loading Messages"
                        height="75vh"

                    /> : <MessagesList
                            messages={messages}
                            userColors={userColors} />
                }


            </main>
        </>

    )
}

export default AllMessages;
