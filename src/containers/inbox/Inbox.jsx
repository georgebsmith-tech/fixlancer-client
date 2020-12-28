import React, { useState, useEffect } from 'react'
import UserHeader from '../../components/UserHeader'
import UserFooter from '../../components/UserFooter'
import { Link } from 'react-router-dom'
import { getDate } from '../../helperFunctions/getDate'
import { Loading } from '../../components/helperComponents/Loading'
import axios from 'axios'
import { domain } from '../../helperFunctions/domain'
import ChatEntryContainer from '../../components/helperComponents/ChatEntryContainer'
import ChatStatus from '../../components/chats/ChatStatus'
import queryString from 'query-string'
import Chats from './Chats'
const Conversation = ({ conversation, loggedUser }) => {
    console.log(loggedUser)
    console.log(conversation)
    const initial = conversation.from === loggedUser ? conversation.to : conversation.from
    // console.log(initial)
    const lastMessageby = conversation.from === loggedUser ? "Me" : conversation.from
    return (

        <li
            className="font15">
            <Link to={`/dashboard/inbox?with=${initial}`} className="block inbox-summary border-bottom">
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
    console.log(conversations)
    const theConversations = conversations.map(conversation => <Conversation conversation={conversation} loggedUser={loggedUser} key={conversation._id} />)
    return (

        <ul>
            {theConversations}
        </ul>

    )
}
const Inbox = ({ location }) => {
    const [conversations, setConversations] = useState([])
    const [isLoading, setIsloading] = useState(true)
    const loggedUser = localStorage.getItem("username")
    const [with_, setWith_] = useState("")
    const [chats, setChats] = useState([])


    useEffect(() => {

        const fetchData = async () => {
            const url = `${domain}/api/chats/${loggedUser}`
            const response = await axios.get(url)
            const data = response.data
            console.log(data)
            setConversations(data)
            setIsloading(false)

        }
        const fetchDataWith = async (with_) => {
            setIsloading(true)
            try {


                const url = `${domain}/api/chats/${loggedUser}/${with_}`

                const response = await axios.get(url)
                const data = response.data
                console.log(data)
                setChats(data.chats)
                setIsloading(false)
            } catch (err) {
                console.log(err)
            }

        }
        const qs = queryString.parse(location.search)
        console.log(qs)



        if (!qs.with)
            fetchData()
        else {
            console.log("private")
            setWith_(qs.with)
            fetchDataWith(qs.with)
        }


    }, [location.search])



    return (

        <>
            <UserHeader />
            <main className="main">
                {!location.search ?
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
                    : <>
                        <ChatStatus recipient={with_} />
                        <div className="message-container">
                            <Chats chats={chats} />


                        </div>
                        <ChatEntryContainer />
                    </>
                }

            </main>

        </>
    )

}
export default Inbox;