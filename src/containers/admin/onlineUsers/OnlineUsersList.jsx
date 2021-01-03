import React, { useState } from 'react'
import { UserMobile, UserDesktop } from './OnlineUser'

const UsersList = ({ users }) => {

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