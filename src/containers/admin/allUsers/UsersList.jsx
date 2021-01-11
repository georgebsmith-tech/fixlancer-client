import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { UserMobile, UserDesktop } from './User'

const UsersList = ({ users, updateUsers }) => {

    return (
        <div>
            <h2
                className="bold margin20-bottom font16 margin20-top">Showing 20 most recent
            </h2>
            <ul
                className="grid-responsive-max6 mobile">
                {
                    users.map(user => <UserMobile
                        user={user}
                        key={user._id}
                        updateUsers={updateUsers}

                    />
                    )
                }
            </ul>
            <ul
                className="desktop">
                {
                    users.map(user =>
                        <UserDesktop
                            user={user}
                            key={user._id}
                        />)
                }
            </ul>
        </div>



    )
}

export default UsersList;