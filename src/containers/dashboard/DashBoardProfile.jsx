import React from "react"
import {Link} from 'react-router-dom'

const DashBoardProfile=({user})=>{
    return (
        <div className="border-smooth bg-white padd10 margin30-top  grid2-1-6 margin20-bottom mobile">
        <div>
           
            <span className=" user-avatar font28 bold" style={{width: 60,height: 60,backgroundColor:user.userColor}}>{user?user.username[0].toUpperCase():"S"}</span>

        </div>
        <div>
            <div className="border-bottom padd20-bottom margin10-bottom">
                <div>
                    <Link to={`/u/${user.username}`} className="text-link-with-hover bold font15">
                        {user.username}
                    </Link>

                </div>
                <div className="font14 margin5-top">
                    4.4 Ratings
                </div>
            </div>
            <div>
                <div className="font14 margin20-bottom">
                   {user.bio||"No bio yet..."}

                </div>
                <div>
                    <Link to="/dashboard/edit" className="block font14 text-orange padd10 border-smooth"
                        style={{width: "fit-content", border:"1px solid #f27415"}}>
                        Edit Profile
                    </Link>

                </div>
            </div>


        </div>

    </div>
    )
}

export default DashBoardProfile