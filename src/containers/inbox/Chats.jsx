import React from 'react'
import Chat from './Chat'

const Chats = ({ chats }) => {

    return (
        <ul className="margin10-top">
            {
                chats.map(chat =>
                    <Chat
                        chat={chat} key={chat._id}
                    />
                )
            }
        </ul>
    )
}

export default Chats