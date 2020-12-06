import React, { useState, useEffect } from 'react'
import UserHeader from '../../components/UserHeader'
import UserFooter from '../../components/UserFooter'
import { Link } from 'react-router-dom'
import { getDate } from '../../helperFunctions/getDate'
import { Loading } from '../../components/helperComponents/Loading'
import axios from 'axios'
import { domain } from '../../helperFunctions/domain'

const Conversation = ({ conversation, loggedUser }) => {

    const initial = conversation.from === loggedUser ? conversation.to : conversation.from
    const lastMessageby = conversation.from === loggedUser ? "Me" : conversation.from
    return (

        <li
            className="font15">
            <Link to={`/dashboard/inbox?with=${conversation.to}`} className="block inbox-summary border-bottom">
                <div
                    className="grid">
                    <span
                        className="user-avatar"
                        style={{ backgroundColor: conversation.userColor }}>{initial[0].toUpperCase()}
                    </span>
                    <div>
                        <span
                            className="bold block desktop">
                            {lastMessageby}:
                                         </span>
                        <span class="who bold margin3-right">{lastMessageby}:</span>
                        <span>{conversation.message}</span>

                    </div>


                </div>
                <div className="flex-end font12">{getDate(conversation.createdAt)}</div>




            </Link>

        </li>
    )
}

const Conversations = ({ conversations = [], loggedUser }) => {
    const theConversations = conversations.map(conversation => <Conversation conversation={conversation} loggedUser={loggedUser} key={conversation._id} />)
    return (

        <ul>
            {theConversations}
        </ul>

    )
}
const Inbox = () => {
    const [conversations, setConversations] = useState([{ message: "this is what i meant" }])
    const [isLoading, setIsloading] = useState(true)
    const loggedUser = localStorage.getItem("username")
    const [recipient, setRecipient] = useState("")

    useEffect(() => {

        const fetchDate = async () => {
            const url = `${domain}/api/chats/${loggedUser}?with=${recipient}`

            const response = await axios.get(url)
            const data = response.data
            console.log(data)
            setConversations(data)
            setIsloading(false)

        }

        fetchDate()


    }, [recipient])
    return (
        <>
            <UserHeader />
            <main className="main">
                <section class="font16 bg-white border-smooth">
                    <h2 className="padd30 border-bottom font16">All conversations</h2>
                    {
                        isLoading ?
                            <Loading height="60vh" message="Loading conversatiions" /> :
                            <Conversations
                                conversations={conversations}
                                loggedUser={loggedUser}

                            />
                    }


                </section>

            </main>
            <UserFooter />
        </>
    )
}

export default Inbox;