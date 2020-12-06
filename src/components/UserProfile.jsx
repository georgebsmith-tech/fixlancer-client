import React from 'react';
import { getDate } from '../helperFunctions/getDate'
import { Link } from 'react-router-dom'

const UserProfile = ({ user }) => {




    // const userInitial=user?user.username[0]:"S"
    const userImage = <div style={{ width: 90, height: 90 }}>
        <img src={user.imageURL} alt={"Avatar of " + user.username} className="object-fit border-smooth" />
    </div>
    const imageIcon = <span className=" user-avatar font28 bold" style={{ width: 60, height: 60, backgroundColor: user.userColor }}>{"S"}</span>
    return (
        <div className="bg-white border-smooth padd20">
            <div className="flex-end">
                <div className="padd5 font14 border-smooth circle">
                    <i className="fa fa-circle online-color margin3-right"></i>
                    <span className="online-color">Active now</span>
                </div>
            </div>
            <div className="margin10-top center-text font15">
                <div>
                    <div className="flex-center margin10-bottom">
                        {
                            user.imageURL ? userImage : imageIcon
                        }

                    </div>
                    <div className="bold margin30-bottom">{user.username}</div>

                </div>
                <ul>
                    <li className="margin20-bottom">
                        Rating: 0

                </li>
                    <li className="margin20-bottom">
                        Member Since: {getDate(user.createdAt)}

                    </li>
                    {user.phone && <li className="margin20-bottom">
                        Mobile No.: {user.phone}

                    </li>}

                    <li className="margin20-bottom">
                        Full Name: {user.fullName}

                    </li>
                    <li className="margin20-bottom">
                        Email: {user.email}

                    </li>
                    <li className="border-smooth padd10 margin20-bottom">
                        <Link to="/dashboard/edit" className="block">
                            <i
                                className="fa fa-pencil margin3-right">

                            </i>
                            <span>Edit Profile</span>
                        </Link>

                    </li>
                </ul>
            </div>
        </div>
    )
}

export default UserProfile