import React from 'react'
import UserHeader from '../../components/UserHeader'

const NotFound = ({ header = true }) => {
    return (
        <>
            {
                header && <UserHeader />
            }

            <div className="center-text font28 flex-center" style={{ height: "90vh" }}>
                <div>
                    <div> 404</div>
                    <div>
                        Page Not Found
                </div>
                </div>
            </div>
        </>
    )
}


export default NotFound