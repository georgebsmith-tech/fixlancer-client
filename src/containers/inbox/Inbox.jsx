import React, { useState, useEffect, useRef } from 'react'
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
const socket = socketIOClient(ENDPOINT)
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
    const messagesEnd = useRef()


    socket.on("chat", data => {
        console.log(data)
        console.log(conversations)

        const toRemove = conversations.find(chat => chat.from === data.sender)

        if (toRemove) {
            const modToRemove = { ...toRemove, message: data.message, createdAt: "just now" }
            // modToRemove.message = data.message
            console.log(modToRemove)

            setConversations([modToRemove, ...conversations.filter(chat => chat.from !== data.sender)])

        }

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
                socket.emit("read-chats", { with: with_, username: loggedUser }, (resp) => {
                    // if (resp.done)
                    //     setChats(chats.map(chat => ({ ...chat })))

                })
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


    const scrollToBottom = () => {
        if (messagesEnd.current) {
            const scrollHeight = messagesEnd.current.scrollHeight;
            const height = messagesEnd.current.clientHeight;
            const maxScrollTop = scrollHeight - height;
            messagesEnd.current.scrollTop = maxScrollTop > 0 ? maxScrollTop : 0;
        }

    }
    // const scrollToBottom = () => {

    //     messagesEnd.current && messagesEnd.current.scrollIntoView({ behavior: "smooth" });
    // }


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
                        <div
                            ref={messagesEnd}
                            className="message-container">
                            <Chats chats={chats} />
                            {/* <div
                                style={{
                                    float: "left",
                                    clear: "both"
                                }}
                                ref={messagesEnd}>
                            </div> */}
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