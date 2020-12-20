import React from 'react'
import { Link } from 'react-router-dom'

const ChatStatus = ({ recipient }) => {
    return (
        <div className="flex-between border-bottom  bg-white border-smooth padd10-top-bottom">
            <div
                style={
                    {
                        display: "flex",
                        alignItems: "center"
                    }
                }>
                <span
                    style={{ width: 20, height: 20 }}
                    className="font13 flex-center circle text-white user-icon bold margin5-right">{recipient[0]}
                </span>
                <Link
                    to={`/u/${recipient}`}
                    className="bold font13 margin5-right text-link-with-hover">{recipient}
                </Link>
                <i
                    className="fa fa-circle user-online margin5-right online-status-icon font13"
                ></i>
                <span
                    className="font13  margin5-right online-status-text">
                    Active now
                </span>
                <em
                    className="typing-status font13 invisible">
                    is typing

                </em>

            </div>

        </div>
    )
}


ChatStatus.defaultProps = {
    recipient: "Smith"
}

export default ChatStatus;