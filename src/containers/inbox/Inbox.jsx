import React, { useState, useEffect } from 'react'
import UserHeader from '../../components/UserHeader'
import { Link, withRouter } from 'react-router-dom'
import { getDate } from '../../helperFunctions/getDate'
import { Loading } from '../../components/helperComponents/Loading'
import axios from 'axios'
import { domain } from '../../helperFunctions/domain'
import ChatEntryContainer from '../../components/helperComponents/ChatEntryContainer'
import ChatStatus from '../../components/chats/ChatStatus'
import queryString from 'query-string'
import Chats from './Chats'
import UserHeaderDesktop from '../../components/UserHeaderDesktop'

import socketIOClient from "socket.io-client";
const ENDPOINT = domain;
const socket = socketIOClient(domain)
const Conversation = ({ conversation, loggedUser }) => {

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
    socket.emit("new-user", { name: localStorage.getItem("username") })
    const [conversations, setConversations] = useState([])
    const [isLoading, setIsloading] = useState(true)
    const loggedUser = localStorage.getItem("username")
    const [with_, setWith_] = useState("")
    const [chats, setChats] = useState([])

    socket.on("chat", data => {
        console.log(data)
        setChats([...chats, data])
    })


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
                console.log(data.chats)
                setChats(data.chats)
                setIsloading(false)
                scrollToBottom()
            } catch (err) {
                console.log(err)
            }

        }
        const qs = queryString.parse(location.search)
        console.log(qs)



        if (!qs.with)
            fetchData()
        else {
            setWith_(qs.with)
            fetchDataWith(qs.with)
        }


    }, [location.search])
    useEffect(() => {
        scrollToBottom()
    }, [chats])

    const updateChat = (newChat) => {
        setChats([...chats, { ...newChat, to: newChat.receiver, from: newChat.sender }])

    }
    const messagesEnd = React.useRef()

    const scrollToBottom = () => {

        messagesEnd.current.scrollIntoView({ behavior: "smooth" });
    }


    return (

        <>
            <UserHeader />
            <UserHeaderDesktop />
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
                            <div style={{ float: "left", clear: "both" }}
                                ref={messagesEnd}>
                            </div>
                        </div>
                        <ChatEntryContainer
                            receiver={with_}
                            updateChat={updateChat}
                        />
                    </>
                }

            </main>

        </>
    )

}
export default withRouter(Inbox);