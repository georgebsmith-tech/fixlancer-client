import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import Message from './Message'

const MessagesList = ({ messages, userColors }) => {

    return (
        <ul className="bg-white">
            {messages.map(message => <Message
                message={message}
                userColors={userColors}
            />)}
        </ul>
    )
}

export default MessagesList;